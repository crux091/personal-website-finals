/**
 * Supabase Comments Data Layer
 * 
 * Clean abstraction for all comment-related database operations
 * including realtime subscriptions.
 * 
 * Table: comments
 * Schema: public
 * RLS: Enabled (public read + insert)
 */

import { supabase } from './client'
import type { Comment } from '@/types/comment'
import type { RealtimeChannel } from '@supabase/supabase-js'

const TABLE_NAME = 'comments'
const DEFAULT_LIMIT = 20

/**
 * Fetch comments from Supabase
 * @param limit - Maximum number of comments to fetch (default: 20)
 * @returns Array of comments ordered by newest first
 */
export async function fetchComments(limit = DEFAULT_LIMIT): Promise<Comment[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching comments:', error)
    throw new Error(`Failed to fetch comments: ${error.message}`)
  }

  return data || []
}

/**
 * Create a new comment
 * @param name - User's name (max 100 chars)
 * @param message - Comment message (max 500 chars)
 * @returns The created comment
 */
export async function createComment(
  name: string,
  message: string
): Promise<Comment> {
  // Trim whitespace
  const trimmedName = name.trim()
  const trimmedMessage = message.trim()

  // Validate inputs
  if (!trimmedName || trimmedName.length > 100) {
    throw new Error('Name must be between 1 and 100 characters')
  }

  if (!trimmedMessage || trimmedMessage.length > 500) {
    throw new Error('Message must be between 1 and 500 characters')
  }

  // Insert into database
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      name: trimmedName,
      message: trimmedMessage,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating comment:', error)
    throw new Error(`Failed to create comment: ${error.message}`)
  }

  if (!data) {
    throw new Error('No data returned from comment creation')
  }

  return data
}

/**
 * Subscribe to realtime INSERT events on the comments table
 * @param callback - Function to call when a new comment is inserted
 * @returns RealtimeChannel instance for cleanup
 */
export function subscribeToRealtimeComments(
  callback: (comment: Comment) => void
): RealtimeChannel {
  const channel = supabase
    .channel('public:comments')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLE_NAME,
      },
      (payload) => {
        if (payload.new) {
          callback(payload.new as Comment)
        }
      }
    )
    .subscribe()

  return channel
}

/**
 * Unsubscribe from realtime comments
 * @param channel - The channel to unsubscribe from
 */
export async function unsubscribeFromRealtimeComments(
  channel: RealtimeChannel
): Promise<void> {
  await supabase.removeChannel(channel)
}
