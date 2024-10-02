export type Voice = {
  id: string;
  displayName: string;
  locale: string;
  gender: string;
  imageUrl: string;
  speakerType: string;
  ageRange: string;
  speakerStyles: [
    {
      deprecated: boolean;
      id: string;
      displayName: string;
      sampleTtsUrl: string;
    },
  ];
};
