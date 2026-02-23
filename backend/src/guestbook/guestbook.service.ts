import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const TABLE_NAME = 'comments'
const DEFAULT_LIMIT = 20

@Injectable()
export class GuestbookService {
  private readonly supabase: SupabaseClient

  constructor() {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY

    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables')
    }

    this.supabase = createClient(url, key)
  }

  /**
   * Fetch the latest comments from Supabase
   */
  async findAll(limit = DEFAULT_LIMIT) {
    const { data, error } = await this.supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new InternalServerErrorException(`Failed to fetch comments: ${error.message}`)
    }

    return data ?? []
  }

  /**
   * Create a new comment in Supabase
   */
  async create(name: string, message: string) {
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || trimmedName.length > 100) {
      throw new BadRequestException('Name must be between 1 and 100 characters')
    }

    if (!trimmedMessage || trimmedMessage.length > 500) {
      throw new BadRequestException('Message must be between 1 and 500 characters')
    }

    const { data, error } = await this.supabase
      .from(TABLE_NAME)
      .insert({ name: trimmedName, message: trimmedMessage })
      .select()
      .single()

    if (error) {
      throw new InternalServerErrorException(`Failed to create comment: ${error.message}`)
    }

    if (!data) {
      throw new InternalServerErrorException('No data returned from comment creation')
    }

    return data
  }
}
