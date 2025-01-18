import { PostTypes } from './post-types';

export type BlogContents = {
  [PostTypes.Link]: {
    url: string;
    description?: string;
  };
  [PostTypes.Photo]: {
    url: string;
  };
  [PostTypes.Quote]: {
    quote: string;
    author: string;
  };
  [PostTypes.Text]: {
    title: string;
    teaser: string;
    text: string;
  };
  [PostTypes.Video]: {
    title: string;
    url: string;
  };
};

// export type BlogContents = {
//   [PostTypes.Link]: {
//     linkUrl: string;
//     linkDescription?: string;
//   };
//   [PostTypes.Photo]: {
//     photoUrl: string;
//   };
//   [PostTypes.Quote]: {
//     quote: string;
//     quoteAuthor: string;
//   };
//   [PostTypes.Text]: {
//     title: string;
//     teaser: string;
//     text: string;
//   };
//   [PostTypes.Video]: {
//     title: string;
//     videoUrl: string;
//   };
// };