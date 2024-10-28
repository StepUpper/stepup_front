import { shoeSearch } from "@assets/assets";

const NotFound = () => {
  return (
    <>
      <section className="item-center w-full h-real-screen bg-white dark:bg-zinc-800">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <img src={shoeSearch} alt="페이지를 찾을 수 없음" className="inline-block min-w-40 md:min-w-56" />
            <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-black lg:text-9xl dark:text-white hidden">
              404
            </h1>
            <p className="mb-4 text-lg font-bold text-gray-900 md:text-2xl dark:text-white">
              죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
            </p>
            <p className="mb-4 text-sm font-paragraph md:text-base text-grey-500 dark:text-gray-400">
              존재하지 않는 주소를 입력하셨거나, <br/> 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </p>
            <a
              href="/stepup_front"
              className="my-4 inline-flex rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              홈으로
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotFound;
