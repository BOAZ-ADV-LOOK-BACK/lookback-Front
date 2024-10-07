import dynamic from 'next/dynamic'

const AdditionalInfoForm = dynamic(() => import('@/components/component/AdditionalInfoForm'), { ssr: false })

export default function AdditionalInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">추가 정보 입력</h1>
      <AdditionalInfoForm />
    </div>
  )
}