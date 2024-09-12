import { plusIcon } from '@/assets/assets'
import Header from '@/components/common/Header'
import Button from '@/components/common/html/Button'
import InputField from '@/components/common/InputField'

const page = () => {
  return (
    <div>
        <Header type="back">신발 등록</Header>
        <main className="flex h-full flex-col gap-7 p-4">
            {/* 상품 찾기 버튼 */}
            <InputField title='신발을 선택해 주세요'>
                <Button className="item-center w-full bg-grey-50 rounded-md p-1.5">
                    <img src={plusIcon}/>
                </Button>
            </InputField>
            {/* rating card */}
        </main>
    </div>
  )
}

export default page