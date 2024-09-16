import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    // 토큰 저장 로직을 이곳에 구현 (예: 데이터베이스에 저장)
    console.log('Received Access Token:', accessToken);

    // 성공 응답 반환
    return NextResponse.json({ message: 'Token saved successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save token' }, { status: 500 });
  }
}
