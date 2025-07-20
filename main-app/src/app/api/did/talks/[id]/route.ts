import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    if (!id) {
      return NextResponse.json({ error: 'Talk ID is required' }, { status: 400 })
    }

    const didApiKey = process.env.DID_API_KEY
    if (!didApiKey) {
      return NextResponse.json({ error: 'DID API key not configured' }, { status: 500 })
    }

    const response = await fetch(`https://api.d-id.com/talks/${id}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(didApiKey + ':').toString('base64')}`,
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('DID API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch talk status' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('DID talk status API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    if (!id) {
      return NextResponse.json({ error: 'Talk ID is required' }, { status: 400 })
    }

    const didApiKey = process.env.DID_API_KEY
    if (!didApiKey) {
      return NextResponse.json({ error: 'DID API key not configured' }, { status: 500 })
    }

    const response = await fetch(`https://api.d-id.com/talks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${Buffer.from(didApiKey + ':').toString('base64')}`,
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('DID API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to delete talk' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('DID talk delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}