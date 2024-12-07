import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};


export default component$(() => {
  return (
    <>
      <div class="navbar w-[90%] py-4 m-auto flex items-center justify-between ">
        <div class="title">
          <h1 class="text-3xl font-bold cursor-pointer">
            <Link prefetch={true} href="/">Qwik Tasks</Link>
          </h1>
        </div>
        <div class="links">
          <ul class="flex gap-[4rem] text-2xl font-bold">
            <li class="cursor-pointer hover:underline hover:text-blue-600"><Link prefetch={true} href="/">Home</Link></li>
            <li class="cursor-pointer hover:underline hover:text-blue-600"><Link prefetch={true} href="/analytics">Analytics</Link></li>
          </ul>
        </div>
        <div class="search">
          <form action="">
            <input class="p-2 bg-gray-200 mr-[1rem] outline-none font-bold focus:bg-blue-100" type="text" placeholder="Search" />
            <button class="px-[1rem] py-[0.5rem] bg-blue-200 font-bold rounded">Search</button>
          </form>
        </div>
      </div>
      <Slot />
    </>
  );
});
