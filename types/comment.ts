/**
 * Comment type definition matching Supabase schema
 * Table: comments
 * 
 * Schema:
 * - id: UUID (primary key, auto-generated)
 * - name: TEXT (NOT NULL, max 100 chars)
 * - message: TEXT (NOT NULL, max 500 chars)
 * - created_at: TIMESTAMP WITH TIME ZONE (auto-generated)
 */

export type Comment = {
  id: string
  name: string
  message: string
  created_at: string
}

export type CommentInsert = Omit<Comment, 'id' | 'created_at'>
