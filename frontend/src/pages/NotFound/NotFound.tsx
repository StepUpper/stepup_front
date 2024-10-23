const NotFound = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-black lg:text-9xl dark:text-white">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.{" "}
            </p>
            <a
              href="/stepup_front"
              className="my-4 inline-flex rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotFound;
