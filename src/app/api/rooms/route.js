import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET all rooms (with images)
export async function GET() {
  try {
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select(`
        *,
        room_images (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create new room
export async function POST(request) {
  try {
    const { title, description, location, room_type, price_monthly, square_feet, features } = await request.json()
    
    // Get current user (admin)
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

    const { data: room, error } = await supabase
      .from('rooms')
      .insert([{
        title,
        description,
        location,
        room_type,
        price_monthly: parseFloat(price_monthly),
        square_feet: parseInt(square_feet),
        features: features || [],
        created_by: user.id,
        availability_status: 'available'
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(room, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}