import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { fullBlog } from "@/sanity/lib/interface";
import { PortableText } from "@portabletext/react";
import { log } from "console";
import Image from "next/image";
import React from "react";
import { PortableTextInput } from "sanity";

export const revalidate = 30; //revalidate at most 30 sec.

async function getData(slug: string) {
  const query = `
    *[_type == "post" && slug.current == '${slug}' ]{
        "slug": slug.current,
          description,
          _createdAt,
          title,
          body,
          mainImage,
          author -> {
            image,
            name,
          }
      }[0]
    `;

  const data = await client.fetch(query);
  return data;
}

async function Post({ params }: { params: { slug: string } }) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div>
      <Header />
      <Image
        className="w-full h-48 object-cover"
        width={800}
        height={800}
        priority
        src={urlForImage(data.mainImage).url()}
        alt="mainImage"
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3 font-bold">{data.title}</h1>
        <h2 className="text-lg font-light text-gray-500 mb-2">
          {data.description}
        </h2>

        <div className="flex items-center space-x-3 ">
          <Image
            className="w-10 h-10 object-cover rounded-full"
            width={800}
            height={800}
            priority
            src={urlForImage(data.author.image).url()}
            alt="authorImage"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{data.author.name}</span> -
            Published at {new Date(data._createdAt).toLocaleString()}
          </p>
        </div>
      </article>

      <div className="mt-5 max-w-3xl mx-auto prose prose-lg prose-li:marker:text-primary mb-10 p-3">
        {" "}
        <PortableText value={data.body} />{" "}
      </div>
    </div>
  );
}

export default Post;
