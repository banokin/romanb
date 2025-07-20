import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { script, config, presenter_id, driver } = body

    if (!script || !presenter_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const didApiKey = process.env.DID_API_KEY
    if (!didApiKey) {
      return NextResponse.json({ error: 'DID API key not configured' }, { status: 500 })
    }

    const response = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(didApiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script,
        config: config || {
          fluent: true,
          pad_audio: 0.0
        },
        presenter_id,
        driver: driver || 'text'
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('DID API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to create talk' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('DID talks API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const didApiKey = process.env.DID_API_KEY
    if (!didApiKey) {
      return NextResponse.json({ error: 'DID API key not configured' }, { status: 500 })
    }

    const response = await fetch('https://api.d-id.com/talks', {
      headers: {
        'Authorization': `Basic ${Buffer.from(didApiKey + ':').toString('base64')}`,
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch talks' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('DID talks API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}