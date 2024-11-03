'use server';

import { revalidatePath } from 'next/cache'

type UserInfo = {
  occupation: string
  interest: string
}

export async function updateUser(userInfo: UserInfo) {
  try {
    // 여기에 실제 DB 업데이트 로직을 구현합니다.
    // 예를 들어, prisma를 사용한다면:
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: userInfo
    // })

    // DB 업데이트를 시뮬레이션하기 위해 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 캐시된 데이터를 재검증합니다.
    revalidatePath('/profile')

    return { success: true, message: '사용자 정보가 성공적으로 업데이트되었습니다.' }
  } catch (error) {
    console.error('사용자 정보 업데이트 중 오류 발생:', error)
    return { success: false, message: '사용자 정보 업데이트 중 오류가 발생했습니다.' }
  }
}