import Header from "@/components/Header";
import Posts from "@/components/Posts";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { simpleBlogCard } from "@/sanity/lib/interface";
import post from "@/sanity/schemas/post";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30; //revalidate at most 30 sec.

async function getData() {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image,
    },
  description,
  mainImage,
  slug,
  }`;

  const data: simpleBlogCard[] = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = await getData();
  console.log("Data: ", data);

  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and comment
          </h1>
          <h2>
            It easy and free to post your thinking on any topic and connect with
            millions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="mediumLogo"
        />
      </div>
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {data.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <Image
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlForImage(post.mainImage).url()}
                alt="blogImage"
                width={500}
                height={500}
              />
              <div className="flex justify-between p-5 bg-white">
                <div className="">
                  <p className="text-lg font-bold"> {post.title} </p>
                  <p className="text-xs">
                    {" "}
                    {post.description} by {post.author.name}
                  </p>
                  <p></p>
                </div>
                <Image
                  className="h-11 w-11 rounded-full"
                  src={urlForImage(post.author.image).url()}
                  alt="authorImage"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
