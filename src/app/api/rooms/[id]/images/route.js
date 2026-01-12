import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET images for a room
export async function GET(request, { params }) {
  try {
    const { id } = await params
    
    const { data: images, error } = await supabase
      .from('room_images')
      .select('*')
      .eq('room_id', id)
      .order('is_primary', { ascending: false })
      .order('uploaded_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST upload image for a room
export async function POST(request, { params }) {
  try {
    const { id } = await params
    const { image_url, is_primary } = await request.json()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // If setting as primary, unset other primaries
    if (is_primary) {
      await supabase
        .from('room_images')
        .update({ is_primary: false })
        .eq('room_id', id)
    }

    const { data: image, error } = await supabase
      .from('room_images')
      .insert([{
        room_id: id,
        image_url,
        is_primary: is_primary || false
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}