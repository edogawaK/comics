const axios = require("axios");
const fs = require("fs");
const { get } = require("http");
const options = {
  headers: {
    ["api-key"]: "5d2300c2c69d24a09cf5b09b",
    profileid: "63a50f87c549fe00a1226539",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5RV1gwdXYybXlyeWowVkhTdHJoSFBKbjIxeGFpTUs0ZEFaWjFrU3IwUmI5R3hXTXVUSDg3cXFHR3JjQWhMaEoiLCJ1c2VySWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1MzgiLCJyb2xlcyI6WyJHVUVTVCJdLCJwcm9maWxlcyI6W3siaWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1MzkiLCJhZ2UiOjE4LCJtcGFhIjp7ImlkIjoiNWQyM2UxMjU5NTI1MWI5OGJkMDQzMzc2IiwiYWdlIjoxOH19LHsiaWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1M2EiLCJhZ2UiOjcsIm1wYWEiOnsiaWQiOiI1ZDIzZTFlMjk1MjUxYjk4YmQwNDM0MWQiLCJhZ2UiOjd9fV0sImlhdCI6MTY3MTc2MTc5OSwiZXhwIjoxOTg3MTIxNzk5fQ.P1Qbn0qjERzMLNXSh539--k9roR4WyIobLWztk5QNbA",
  },
};
const comics = [];
const chapters = [];

async function getComics() {
  const genres = "5eb50102aa63450033ea5aac";
  let hasMoreItems = false;
  let page = 0;
  do {
    const { data } = await axios.get(
      `https://products.popsww.com/api/v5/Metadata/genres/${genres}/fetchComic?limit=40&page=${++page}`,
      options
    );

    for (const i of data.data.items) {
      const comic = {
        id: i.id,
        title: i.title,
        slug: i.slug,
        description: i.description,
        introduction: i.introduction,
        totalView: i.totalView,
        totalLike: i.totalLike,
        chapterNum: Infinity.chapterNum,
        author: i.author,
        genres: i.genres,
      };
      comics.push(comic);
    }

    hasMoreItems = data.data.hasMoreItems;
  } while (hasMoreItems);
  fs.writeFileSync("comics.json", JSON.stringify(comics));
}

async function getChapters(id, slug) {
  let totalChapterPage = 1;
  let page = 1;
  while (page <= totalChapterPage) {
    const url = `https://products.popsww.com/api/v5/ComicTitles/getChapters?id=${id}&page=${page}&order=asc&limit=10`;
    const { data } = await axios.get(url, options);
    for (const i of data.chapters) {
      if (i.isFree) {
        // const source = await getSource(
        //   { id, slug },
        //   { id: i.id, slug: i.slug }
        // );
        chapters.push({
          id: i.id,
          slug: i.slug,
          name: i.name,
          view: i.totalView,
          // source,
        });
      }
    }
    page++;
    totalChapterPage = data.totalChapterPage;
    console.log(page, totalChapterPage);
  }
  fs.writeFileSync("chapters.json", JSON.stringify(chapters));
}

// async function Infinity() {
//   const genres = "5eb50102aa63450033ea5aac";
//   const options = {
//     headers: {
//       ["api-key"]: "5d2300c2c69d24a09cf5b09b",
//       profileid: "63a50f87c549fe00a1226539",
//       authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5RV1gwdXYybXlyeWowVkhTdHJoSFBKbjIxeGFpTUs0ZEFaWjFrU3IwUmI5R3hXTXVUSDg3cXFHR3JjQWhMaEoiLCJ1c2VySWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1MzgiLCJyb2xlcyI6WyJHVUVTVCJdLCJwcm9maWxlcyI6W3siaWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1MzkiLCJhZ2UiOjE4LCJtcGFhIjp7ImlkIjoiNWQyM2UxMjU5NTI1MWI5OGJkMDQzMzc2IiwiYWdlIjoxOH19LHsiaWQiOiI2M2E1MGY4N2M1NDlmZTAwYTEyMjY1M2EiLCJhZ2UiOjcsIm1wYWEiOnsiaWQiOiI1ZDIzZTFlMjk1MjUxYjk4YmQwNDM0MWQiLCJhZ2UiOjd9fV0sImlhdCI6MTY3MTc2MTc5OSwiZXhwIjoxOTg3MTIxNzk5fQ.P1Qbn0qjERzMLNXSh539--k9roR4WyIobLWztk5QNbA",
//     },
//   };

//   let hasMoreItems = false;
//   const comics = [];
//   let page = 0;
//   do {
//     const { data } = await axios.get(
//       `https://products.popsww.com/api/v5/Metadata/genres/${genres}/fetchComic?limit=40&page=${++page}`,
//       options
//     );
//     const getSource = async (comic, chapter) => {
//       const result = [];
//       const url = `https://pops.vn/_next/data/ta8n0iTcHL99iEyd8_J0i/vi/comics/${comic.slug}-${comic.id}/${chapter.slug}-${chapter.id}.json?tid=${comic.slug}-${comic.id}&cid=${chapter.slug}-${chapter.id}`;
//       const { data } = await axios.get(url, options);

//       data.pageProps.chapterDetail.contents.forEach((i) => {
//         console.log(i.default.url);
//         result.push(i.default.url);
//       });
//       return result;
//     };
//     const getChapters = async (id, slug) => {
//       const result = [];
//       let totalChapterPage = 1;
//       let page = 1;
//       while (page <= totalChapterPage) {
//         const url = `https://products.popsww.com/api/v5/ComicTitles/getChapters?id=${id}&page=${page}&order=asc&limit=10`;
//         const { data } = await axios.get(url, options);
//         // data.chapters.forEach(async(i) => {
//         //   result.push({
//         //     id: i.id,
//         //     slug: i.slug,
//         //     name: i.name,
//         //     view: i.totalView,
//         //     source: await getSource({ id, slug },
//         //             { id: i.id, slug: i.slug })
//         //   })});
//         for (const i of data.chapters) {
//           if (i.isFree) {
//             const source = await getSource(
//               { id, slug },
//               { id: i.id, slug: i.slug }
//             );
//             result.push({
//               id: i.id,
//               slug: i.slug,
//               name: i.name,
//               view: i.totalView,
//               source,
//             });
//           }
//         }

//         page++;
//         totalChapterPage = data.totalChapterPage;
//         console.log(page, totalChapterPage);
//       }
//       return result;
//     };

//     for (const i of data.data.items) {
//       const chapters = await getChapters(i.id, i.slug);
//       const comic = {
//         id: i.id,
//         title: i.title,
//         slug: i.slug,
//         description: i.description,
//         introduction: i.introduction,
//         totalView: i.totalView,
//         totalLike: i.totalLike,
//         chapterNum: Infinity.chapterNum,
//         author: i.author,
//         genres: i.genres,
//         chapters,
//       };
//       comics.push(comic);
//     }

//     hasMoreItems = data.data.hasMoreItems;
//     console.log(data.data.hasMoreItems);
//   } while (false);

//   console.log(comics.length);
//   fs.writeFileSync("store.json", JSON.stringify(comics));
// }
// Infinity();
(async function () {
  await getComics();
  comics.forEach(async (comic) => await getChapters(comic.id, comic.slug));
  console.log(comics.length);
})();
// getChapters();
