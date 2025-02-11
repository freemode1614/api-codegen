export enum AstronomicalObjectType {
  "PLANET" = "PLANET",
  "D_CLASS_PLANET" = "D_CLASS_PLANET",
  "H_CLASS_PLANET" = "H_CLASS_PLANET",
  "GAS_GIANT_PLANET" = "GAS_GIANT_PLANET",
  "K_CLASS_PLANET" = "K_CLASS_PLANET",
  "L_CLASS_PLANET" = "L_CLASS_PLANET",
  "M_CLASS_PLANET" = "M_CLASS_PLANET",
  "Y_CLASS_PLANET" = "Y_CLASS_PLANET",
  "ROGUE_PLANET" = "ROGUE_PLANET",
  "ARTIFICIAL_PLANET" = "ARTIFICIAL_PLANET",
  "ASTEROID" = "ASTEROID",
  "ASTEROIDAL_MOON" = "ASTEROIDAL_MOON",
  "ASTEROID_BELT" = "ASTEROID_BELT",
  "CLUSTER" = "CLUSTER",
  "COMET" = "COMET",
  "CONSTELLATION" = "CONSTELLATION",
  "GALAXY" = "GALAXY",
  "MOON" = "MOON",
  "M_CLASS_MOON" = "M_CLASS_MOON",
  "NEBULA" = "NEBULA",
  "PLANETOID" = "PLANETOID",
  "D_CLASS_PLANETOID" = "D_CLASS_PLANETOID",
  "QUASAR" = "QUASAR",
  "STAR" = "STAR",
  "STAR_SYSTEM" = "STAR_SYSTEM",
  "SECTOR" = "SECTOR",
  "REGION" = "REGION",
}
export enum BloodType {
  "B_NEGATIVE" = "B_NEGATIVE",
  "O_NEGATIVE" = "O_NEGATIVE",
  "T_NEGATIVE" = "T_NEGATIVE",
}
export enum ContentRatingSystem {
  "BBFC" = "BBFC",
  "OFLC" = "OFLC",
  "OFLCNZ" = "OFLCNZ",
  "DJCTQ" = "DJCTQ",
  "MDA" = "MDA",
  "MPAA" = "MPAA",
  "CHVRS" = "CHVRS",
  "RCQ" = "RCQ",
  "IFCO" = "IFCO",
  "FSK" = "FSK",
  "NICAM" = "NICAM",
  "MCCYP" = "MCCYP",
  "EIRIN" = "EIRIN",
  "HK" = "HK",
  "CBFC" = "CBFC",
  "NMHH" = "NMHH",
  "VRC" = "VRC",
  "RSAC" = "RSAC",
  "ESRB" = "ESRB",
  "ELSPA" = "ELSPA",
  "PEGI" = "PEGI",
  "USK" = "USK",
  "SELL" = "SELL",
  "ADESE" = "ADESE",
  "GSRR" = "GSRR",
  "ITUNES" = "ITUNES",
}
export enum Gender {
  "F" = "F",
  "M" = "M",
}
export enum MaritalStatus {
  "SINGLE" = "SINGLE",
  "ENGAGED" = "ENGAGED",
  "MARRIED" = "MARRIED",
  "DIVORCED" = "DIVORCED",
  "REMARRIED" = "REMARRIED",
  "SEPARATED" = "SEPARATED",
  "WIDOWED" = "WIDOWED",
  "CAPTAINS_WOMAN" = "CAPTAINS_WOMAN",
}
export enum ProductionRunUnit {
  "BOX" = "BOX",
  "SET" = "SET",
}
export enum ReferenceType {
  "ASIN" = "ASIN",
  "ISBN" = "ISBN",
}
export enum ResponseSortDirection {
  "ASC" = "ASC",
  "DESC" = "DESC",
}
export enum VideoReleaseFormat {
  "SUPER_8" = "SUPER_8",
  "BETAMAX" = "BETAMAX",
  "VHS" = "VHS",
  "CED" = "CED",
  "LD" = "LD",
  "VHD" = "VHD",
  "VCD" = "VCD",
  "VIDEO_8" = "VIDEO_8",
  "DVD" = "DVD",
  "UMD" = "UMD",
  "HD_DVD" = "HD_DVD",
  "BLU_RAY" = "BLU_RAY",
  "BLU_RAY_4K_UHD" = "BLU_RAY_4K_UHD",
  "DIGITAL_FORMAT" = "DIGITAL_FORMAT",
}
export type AnimalHeader = {
  uid: string;
  name: string;
};
export type AnimalBase = {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
};
export type AnimalFull = {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
};
export type AnimalBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  animals: AnimalBase[];
};
export type AnimalFullResponse = {
  animal: AnimalFull;
};
export type AstronomicalObjectHeader = {
  uid: string;
  name: string;
};
export type AstronomicalObjectBase = {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectType;
  location: AstronomicalObjectHeader;
};
export type AstronomicalObjectFull = {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectType;
  location: AstronomicalObjectBase;
  astronomicalObjects: AstronomicalObjectBase[];
};
export type AstronomicalObjectBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  astronomicalObjects: AstronomicalObjectBase[];
};
export type AstronomicalObjectFullResponse = {
  astronomicalObject: AstronomicalObjectFull;
};
export type BookHeader = {
  uid: string;
  title: string;
};
export type BookBase = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  novel: boolean;
  referenceBook: boolean;
  biographyBook: boolean;
  rolePlayingBook: boolean;
  eBook: boolean;
  anthology: boolean;
  novelization: boolean;
  audiobook: boolean;
  audiobookAbridged: boolean;
  audiobookPublishedYear: number;
  audiobookPublishedMonth: number;
  audiobookPublishedDay: number;
  audiobookRunTime: number;
  productionNumber: string;
};
export type BookFull = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  novel: boolean;
  referenceBook: boolean;
  biographyBook: boolean;
  rolePlayingBook: boolean;
  eBook: boolean;
  anthology: boolean;
  novelization: boolean;
  audiobook: boolean;
  audiobookAbridged: boolean;
  audiobookPublishedYear: number;
  audiobookPublishedMonth: number;
  audiobookPublishedDay: number;
  audiobookRunTime: number;
  productionNumber: string;
  bookSeries: BookSeriesBase[];
  authors: StaffBase[];
  artists: StaffBase[];
  editors: StaffBase[];
  audiobookNarrators: StaffBase[];
  publishers: CompanyBase[];
  audiobookPublishers: CompanyBase[];
  characters: CharacterBase[];
  references: Reference[];
  audiobookReferences: Reference[];
  bookCollections: BookCollectionBase[];
};
export type BookBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  books: BookBase[];
};
export type BookFullResponse = {
  book: BookFull;
};
export type BookCollectionHeader = {
  uid: string;
  title: string;
};
export type BookCollectionBase = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
};
export type BookCollectionFull = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  bookSeries: BookSeriesBase[];
  authors: StaffBase[];
  artists: StaffBase[];
  editors: StaffBase[];
  publishers: CompanyBase[];
  characters: CharacterBase[];
  references: Reference[];
  books: BookBase[];
};
export type BookCollectionBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  bookCollections: BookCollectionBase[];
};
export type BookCollectionFullResponse = {
  bookCollection: BookCollectionFull;
};
export type BookSeriesHeader = {
  uid: string;
  title: string;
};
export type BookSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  numberOfBooks: number;
  yearFrom: number;
  yearTo: number;
  miniseries: boolean;
  eBookSeries: boolean;
};
export type BookSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  numberOfBooks: number;
  yearFrom: number;
  yearTo: number;
  miniseries: boolean;
  eBookSeries: boolean;
  parentSeries: BookSeriesBase[];
  childSeries: BookSeriesBase[];
  publishers: CompanyBase[];
  books: BookBase[];
};
export type BookSeriesBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  bookSeries: BookSeriesBase[];
};
export type BookSeriesFullResponse = {
  bookSeries: BookSeriesFull;
};
export type CharacterHeader = {
  uid: string;
  name: string;
};
export type CharacterBase = {
  uid: string;
  name: string;
  gender: Gender;
  yearOfBirth: number;
  monthOfBirth: number;
  dayOfBirth: number;
  placeOfBirth: string;
  yearOfDeath: number;
  monthOfDeath: number;
  dayOfDeath: number;
  placeOfDeath: string;
  height: number;
  weight: number;
  deceased: boolean;
  bloodType: BloodType;
  maritalStatus: MaritalStatus;
  serialNumber: string;
  hologramActivationDate: string;
  hologramStatus: string;
  hologramDateStatus: string;
  hologram: boolean;
  fictionalCharacter: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type CharacterFull = {
  uid: string;
  name: string;
  gender: Gender;
  yearOfBirth: number;
  monthOfBirth: number;
  dayOfBirth: number;
  placeOfBirth: string;
  yearOfDeath: number;
  monthOfDeath: number;
  dayOfDeath: number;
  placeOfDeath: string;
  height: number;
  weight: number;
  deceased: boolean;
  bloodType: BloodType;
  maritalStatus: MaritalStatus;
  serialNumber: string;
  hologramActivationDate: string;
  hologramStatus: string;
  hologramDateStatus: string;
  hologram: boolean;
  fictionalCharacter: boolean;
  mirror: boolean;
  alternateReality: boolean;
  performers: PerformerBase[];
  episodes: EpisodeBase[];
  movies: MovieBase[];
  characterSpecies: CharacterSpecies[];
  characterRelations: CharacterRelation[];
  titles: TitleBase[];
  occupations: OccupationBase[];
  organizations: OrganizationBase[];
};
export type CharacterBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  characters: CharacterBase[];
};
export type CharacterFullResponse = {
  character: CharacterFull;
};
export type CharacterRelation = {
  type: string;
  source: CharacterHeader;
  target: CharacterHeader;
};
export type CharacterSpecies = {
  uid: string;
  name: string;
  numerator: number;
  denominator: number;
};
export type ComicsHeader = {
  uid: string;
  title: string;
};
export type ComicsBase = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  photonovel: boolean;
  adaptation: boolean;
};
export type ComicsFull = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  photonovel: boolean;
  adaptation: boolean;
  comicSeries: ComicSeriesBase[];
  writers: StaffBase[];
  artists: StaffBase[];
  editors: StaffBase[];
  staff: StaffBase[];
  publishers: CompanyBase[];
  characters: CharacterBase[];
  references: Reference[];
  comicCollections: ComicCollectionBase[];
};
export type ComicsBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  comics: ComicsBase[];
};
export type ComicsFullResponse = {
  comics: ComicsFull;
};
export type ComicCollectionHeader = {
  uid: string;
  title: string;
};
export type ComicCollectionBase = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  photonovel: boolean;
};
export type ComicCollectionFull = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  photonovel: boolean;
  comicSeries: ComicSeriesBase[];
  writers: StaffBase[];
  artists: StaffBase[];
  editors: StaffBase[];
  staff: StaffBase[];
  publishers: CompanyBase[];
  characters: CharacterBase[];
  references: Reference[];
  comics: ComicsBase[];
};
export type ComicCollectionBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  comicCollections: ComicCollectionBase[];
};
export type ComicCollectionFullResponse = {
  comicCollection: ComicCollectionFull;
};
export type ComicSeriesHeader = {
  uid: string;
  title: string;
};
export type ComicSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedDayFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  publishedDayTo: number;
  numberOfIssues: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  miniseries: boolean;
  photonovelSeries: boolean;
};
export type ComicSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedDayFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  publishedDayTo: number;
  numberOfIssues: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  miniseries: boolean;
  photonovelSeries: boolean;
  parentSeries: ComicSeriesBase[];
  childSeries: ComicSeriesBase[];
  publishers: CompanyBase[];
  comics: ComicsBase[];
};
export type ComicSeriesBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  comicSeries: ComicSeriesBase[];
};
export type ComicSeriesFullResponse = {
  comicSeries: ComicSeriesFull;
};
export type ComicStripHeader = {
  uid: string;
  title: string;
};
export type ComicStripBase = {
  uid: string;
  title: string;
  periodical: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedDayFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  publishedDayTo: number;
  numberOfPages: number;
  yearFrom: number;
  yearTo: number;
};
export type ComicStripFull = {
  uid: string;
  title: string;
  periodical: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedDayFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  publishedDayTo: number;
  numberOfPages: number;
  yearFrom: number;
  yearTo: number;
  comicSeries: ComicSeriesBase[];
  writers: StaffBase[];
  artists: StaffBase[];
  characters: CharacterBase[];
};
export type ComicStripBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  comicStrips: ComicStripBase[];
};
export type ComicStripFullResponse = {
  comicStrip: ComicStripFull;
};
export type CompanyBase = {
  uid: string;
  name: string;
  broadcaster: boolean;
  collectibleCompany: boolean;
  conglomerate: boolean;
  digitalVisualEffectsCompany: boolean;
  distributor: boolean;
  gameCompany: boolean;
  filmEquipmentCompany: boolean;
  makeUpEffectsStudio: boolean;
  mattePaintingCompany: boolean;
  modelAndMiniatureEffectsCompany: boolean;
  postProductionCompany: boolean;
  productionCompany: boolean;
  propCompany: boolean;
  recordLabel: boolean;
  specialEffectsCompany: boolean;
  tvAndFilmProductionCompany: boolean;
  videoGameCompany: boolean;
};
export type CompanyFull = {
  uid: string;
  name: string;
  broadcaster: boolean;
  collectibleCompany: boolean;
  conglomerate: boolean;
  digitalVisualEffectsCompany: boolean;
  distributor: boolean;
  gameCompany: boolean;
  filmEquipmentCompany: boolean;
  makeUpEffectsStudio: boolean;
  mattePaintingCompany: boolean;
  modelAndMiniatureEffectsCompany: boolean;
  postProductionCompany: boolean;
  productionCompany: boolean;
  propCompany: boolean;
  recordLabel: boolean;
  specialEffectsCompany: boolean;
  tvAndFilmProductionCompany: boolean;
  videoGameCompany: boolean;
};
export type CompanyHeader = {
  uid: string;
  name: string;
};
export type CompanyBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  companies: CompanyBase[];
};
export type CompanyFullResponse = {
  company: CompanyFull;
};
export type ConflictBase = {
  uid: string;
  name: string;
  yearFrom: number;
  yearTo: number;
  earthConflict: boolean;
  federationWar: boolean;
  klingonWar: boolean;
  dominionWarBattle: boolean;
  alternateReality: boolean;
};
export type ConflictFull = {
  uid: string;
  name: string;
  yearFrom: number;
  yearTo: number;
  earthConflict: boolean;
  federationWar: boolean;
  klingonWar: boolean;
  dominionWarBattle: boolean;
  alternateReality: boolean;
  locations: LocationBase[];
  firstSideBelligerents: OrganizationBase[];
  firstSideCommanders: CharacterBase[];
  secondSideBelligerents: OrganizationBase[];
  secondSideCommanders: CharacterBase[];
};
export type ConflictHeader = {
  uid: string;
  name: string;
};
export type ConflictBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  conflicts: ConflictBase[];
};
export type ConflictFullResponse = {
  conflict: ConflictFull;
};
export type ContentLanguage = {
  uid: string;
  name: string;
  iso6391Code: string;
};
export type ContentRating = {
  uid: string;
  contentRatingSystem: ContentRatingSystem;
  rating: string;
};
export type Country = {
  uid: string;
  name: string;
  iso31661Alpha2Code: string;
};
export type ElementHeader = {
  uid: string;
  name: string;
};
export type ElementBase = {
  uid: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicWeight: number;
  transuranium: boolean;
  gammaSeries: boolean;
  hypersonicSeries: boolean;
  megaSeries: boolean;
  omegaSeries: boolean;
  transonicSeries: boolean;
  worldSeries: boolean;
};
export type ElementFull = {
  uid: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicWeight: number;
  transuranium: boolean;
  gammaSeries: boolean;
  hypersonicSeries: boolean;
  megaSeries: boolean;
  omegaSeries: boolean;
  transonicSeries: boolean;
  worldSeries: boolean;
};
export type ElementBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  elements: ElementBase[];
};
export type ElementFullResponse = {
  element: ElementFull;
};
export type EpisodeHeader = {
  uid: string;
  title: string;
};
export type EpisodeBase = {
  uid: string;
  title: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  series: SeriesHeader;
  season: SeasonHeader;
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usAirDate: string;
  finalScriptDate: string;
};
export type EpisodeFull = {
  uid: string;
  title: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  series: SeriesBase;
  season: SeasonBase;
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usAirDate: string;
  finalScriptDate: string;
  writers: StaffBase[];
  teleplayAuthors: StaffBase[];
  storyAuthors: StaffBase[];
  directors: StaffBase[];
  performers: PerformerBase[];
  stuntPerformers: PerformerBase[];
  standInPerformers: PerformerBase[];
  characters: CharacterBase[];
};
export type EpisodeBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  episodes: EpisodeBase[];
};
export type EpisodeFullResponse = {
  episode: EpisodeFull;
};
export type Error = {
  code: string;
  message: string;
};
export type FoodHeader = {
  uid: string;
  name: string;
};
export type FoodBase = {
  uid: string;
  name: string;
  earthlyOrigin: boolean;
  dessert: boolean;
  fruit: boolean;
  herbOrSpice: boolean;
  sauce: boolean;
  soup: boolean;
  beverage: boolean;
  alcoholicBeverage: boolean;
  juice: boolean;
  tea: boolean;
};
export type FoodFull = {
  uid: string;
  name: string;
  earthlyOrigin: boolean;
  dessert: boolean;
  fruit: boolean;
  herbOrSpice: boolean;
  sauce: boolean;
  soup: boolean;
  beverage: boolean;
  alcoholicBeverage: boolean;
  juice: boolean;
  tea: boolean;
};
export type FoodBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  foods: FoodBase[];
};
export type FoodFullResponse = {
  food: FoodFull;
};
export type Genre = {
  uid: string;
  name: string;
};
export type LiteratureHeader = {
  uid: string;
  title: string;
};
export type LiteratureBase = {
  uid: string;
  title: string;
  earthlyOrigin: boolean;
  shakespeareanWork: boolean;
  report: boolean;
  scientificLiterature: boolean;
  technicalManual: boolean;
  religiousLiterature: boolean;
};
export type LiteratureFull = {
  uid: string;
  title: string;
  earthlyOrigin: boolean;
  shakespeareanWork: boolean;
  report: boolean;
  scientificLiterature: boolean;
  technicalManual: boolean;
  religiousLiterature: boolean;
};
export type LiteratureBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  literature: LiteratureBase[];
};
export type LiteratureFullResponse = {
  literature: LiteratureFull;
};
export type LocationHeader = {
  uid: string;
  name: string;
};
export type LocationBase = {
  uid: string;
  name: string;
  earthlyLocation: boolean;
  fictionalLocation: boolean;
  religiousLocation: boolean;
  geographicalLocation: boolean;
  bodyOfWater: boolean;
  country: boolean;
  subnationalEntity: boolean;
  settlement: boolean;
  usSettlement: boolean;
  bajoranSettlement: boolean;
  colony: boolean;
  landform: boolean;
  landmark: boolean;
  road: boolean;
  structure: boolean;
  shipyard: boolean;
  buildingInterior: boolean;
  establishment: boolean;
  medicalEstablishment: boolean;
  ds9Establishment: boolean;
  school: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type LocationFull = {
  uid: string;
  name: string;
  earthlyLocation: boolean;
  fictionalLocation: boolean;
  religiousLocation: boolean;
  geographicalLocation: boolean;
  bodyOfWater: boolean;
  country: boolean;
  subnationalEntity: boolean;
  settlement: boolean;
  usSettlement: boolean;
  bajoranSettlement: boolean;
  colony: boolean;
  landform: boolean;
  landmark: boolean;
  road: boolean;
  structure: boolean;
  shipyard: boolean;
  buildingInterior: boolean;
  establishment: boolean;
  medicalEstablishment: boolean;
  ds9Establishment: boolean;
  school: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type LocationBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  locations: LocationBase[];
};
export type LocationFullResponse = {
  location: LocationFull;
};
export type MagazineHeader = {
  uid: string;
  title: string;
};
export type MagazineBase = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  issueNumber: string;
};
export type MagazineFull = {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  coverYear: number;
  coverMonth: number;
  coverDay: number;
  numberOfPages: number;
  issueNumber: string;
  magazineSeries: MagazineSeriesBase[];
  editors: StaffBase[];
  publishers: CompanyBase[];
};
export type MagazineBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  magazines: MagazineBase[];
};
export type MagazineFullResponse = {
  magazine: MagazineFull;
};
export type MagazineSeriesHeader = {
  uid: string;
  title: string;
};
export type MagazineSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  numberOfIssues: number;
};
export type MagazineSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom: number;
  publishedMonthFrom: number;
  publishedYearTo: number;
  publishedMonthTo: number;
  numberOfIssues: number;
  publishers: CompanyBase[];
  editors: StaffBase[];
  magazines: MagazineBase[];
};
export type MagazineSeriesBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  magazineSeries: MagazineSeriesBase[];
};
export type MagazineSeriesFullResponse = {
  magazineSeries: MagazineSeriesFull;
};
export type MaterialHeader = {
  uid: string;
  name: string;
};
export type MaterialBase = {
  uid: string;
  name: string;
  chemicalCompound: boolean;
  biochemicalCompound: boolean;
  drug: boolean;
  poisonousSubstance: boolean;
  explosive: boolean;
  gemstone: boolean;
  alloyOrComposite: boolean;
  fuel: boolean;
  mineral: boolean;
  preciousMaterial: boolean;
};
export type MaterialFull = {
  uid: string;
  name: string;
  chemicalCompound: boolean;
  biochemicalCompound: boolean;
  drug: boolean;
  poisonousSubstance: boolean;
  explosive: boolean;
  gemstone: boolean;
  alloyOrComposite: boolean;
  fuel: boolean;
  mineral: boolean;
  preciousMaterial: boolean;
};
export type MaterialBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  materials: MaterialBase[];
};
export type MaterialFullResponse = {
  material: MaterialFull;
};
export type MedicalConditionHeader = {
  uid: string;
  name: string;
};
export type MedicalConditionBase = {
  uid: string;
  name: string;
  psychologicalCondition: boolean;
};
export type MedicalConditionFull = {
  uid: string;
  name: string;
  psychologicalCondition: boolean;
};
export type MedicalConditionBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  medicalConditions: MedicalConditionBase[];
};
export type MedicalConditionFullResponse = {
  medicalCondition: MedicalConditionFull;
};
export type MovieHeader = {
  uid: string;
  title: string;
};
export type MovieBase = {
  uid: string;
  title: string;
  mainDirector: StaffHeader;
  titleBulgarian: string;
  titleCatalan: string;
  titleChineseTraditional: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  titlePolish: string;
  titleRussian: string;
  titleSerbian: string;
  titleSpanish: string;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usReleaseDate: string;
};
export type MovieFull = {
  uid: string;
  title: string;
  mainDirector: StaffBase;
  titleBulgarian: string;
  titleCatalan: string;
  titleChineseTraditional: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  titlePolish: string;
  titleRussian: string;
  titleSerbian: string;
  titleSpanish: string;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usReleaseDate: string;
  writers: StaffBase[];
  screenplayAuthors: StaffBase[];
  storyAuthors: StaffBase[];
  directors: StaffBase[];
  producers: StaffBase[];
  staff: StaffBase[];
  performers: PerformerBase[];
  stuntPerformers: PerformerBase[];
  standInPerformers: PerformerBase[];
  characters: CharacterBase[];
};
export type MovieBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  movies: MovieBase[];
};
export type MovieFullResponse = {
  movie: MovieFull;
};
export type OccupationHeader = {
  uid: string;
  name: string;
};
export type OccupationBase = {
  uid: string;
  name: string;
  legalOccupation: boolean;
  medicalOccupation: boolean;
  scientificOccupation: boolean;
};
export type OccupationFull = {
  uid: string;
  name: string;
  legalOccupation: boolean;
  medicalOccupation: boolean;
  scientificOccupation: boolean;
  characters: CharacterBase[];
};
export type OccupationBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  occupations: OccupationBase[];
};
export type OccupationFullResponse = {
  occupation: OccupationFull;
};
export type OrganizationHeader = {
  uid: string;
  name: string;
};
export type OrganizationBase = {
  uid: string;
  name: string;
  government: boolean;
  intergovernmentalOrganization: boolean;
  researchOrganization: boolean;
  sportOrganization: boolean;
  medicalOrganization: boolean;
  militaryOrganization: boolean;
  militaryUnit: boolean;
  governmentAgency: boolean;
  lawEnforcementAgency: boolean;
  prisonOrPenalColony: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type OrganizationFull = {
  uid: string;
  name: string;
  government: boolean;
  intergovernmentalOrganization: boolean;
  researchOrganization: boolean;
  sportOrganization: boolean;
  medicalOrganization: boolean;
  militaryOrganization: boolean;
  militaryUnit: boolean;
  governmentAgency: boolean;
  lawEnforcementAgency: boolean;
  prisonOrPenalColony: boolean;
  mirror: boolean;
  alternateReality: boolean;
  characters: CharacterBase[];
};
export type OrganizationBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  organizations: OrganizationBase[];
};
export type OrganizationFullResponse = {
  organization: OrganizationFull;
};
export type PerformerHeader = {
  uid: string;
  name: string;
};
export type PerformerBase = {
  uid: string;
  name: string;
  birthName: string;
  gender: Gender;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  animalPerformer: boolean;
  disPerformer: boolean;
  ds9Performer: boolean;
  entPerformer: boolean;
  filmPerformer: boolean;
  standInPerformer: boolean;
  stuntPerformer: boolean;
  tasPerformer: boolean;
  tngPerformer: boolean;
  tosPerformer: boolean;
  videoGamePerformer: boolean;
  voicePerformer: boolean;
  voyPerformer: boolean;
};
export type PerformerFull = {
  uid: string;
  name: string;
  birthName: string;
  gender: Gender;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  animalPerformer: boolean;
  disPerformer: boolean;
  ds9Performer: boolean;
  entPerformer: boolean;
  filmPerformer: boolean;
  standInPerformer: boolean;
  stuntPerformer: boolean;
  tasPerformer: boolean;
  tngPerformer: boolean;
  tosPerformer: boolean;
  videoGamePerformer: boolean;
  voicePerformer: boolean;
  voyPerformer: boolean;
  episodesPerformances: EpisodeBase[];
  episodesStuntPerformances: EpisodeBase[];
  episodesStandInPerformances: EpisodeBase[];
  moviesPerformances: MovieBase[];
  moviesStuntPerformances: MovieBase[];
  moviesStandInPerformances: MovieBase[];
  characters: CharacterBase[];
};
export type PerformerBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  performers: PerformerBase[];
};
export type PerformerFullResponse = {
  performer: PerformerFull;
};
export type Platform = {
  uid: string;
  name: string;
};
export type Reference = {
  uid: string;
  referenceType: ReferenceType;
  referenceNumber: string;
};
export type ResponsePage = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};
export type ResponseSort = {
  clauses: ResponseSortClause[];
};
export type ResponseSortClause = {
  name: string;
  direction: ResponseSortDirection;
  clauseOrder: number;
};
export type SeasonHeader = {
  uid: string;
  title: string;
};
export type SeasonBase = {
  uid: string;
  title: string;
  series: SeriesHeader;
  seasonNumber: number;
  numberOfEpisodes: number;
};
export type SeasonFull = {
  uid: string;
  title: string;
  series: SeriesBase;
  seasonNumber: number;
  numberOfEpisodes: number;
  episodes: EpisodeBase[];
};
export type SeasonBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  seasons: SeasonBase[];
};
export type SeasonFullResponse = {
  season: SeasonFull;
};
export type SeriesHeader = {
  uid: string;
  title: string;
};
export type SeriesBase = {
  uid: string;
  title: string;
  abbreviation: string;
  productionStartYear: number;
  productionEndYear: number;
  originalRunStartDate: string;
  originalRunEndDate: string;
  seasonsCount: number;
  episodesCount: number;
  featureLengthEpisodesCount: number;
  productionCompany: CompanyHeader;
  originalBroadcaster: CompanyHeader;
};
export type SeriesFull = {
  uid: string;
  title: string;
  abbreviation: string;
  productionStartYear: number;
  productionEndYear: number;
  originalRunStartDate: string;
  originalRunEndDate: string;
  seasonsCount: number;
  episodesCount: number;
  featureLengthEpisodesCount: number;
  productionCompany: CompanyBase;
  originalBroadcaster: CompanyBase;
  episodes: EpisodeBase[];
  seasons: SeasonBase[];
};
export type SeriesBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  series: SeriesBase[];
};
export type SeriesFullResponse = {
  series: SeriesFull;
};
export type SoundtrackHeader = {
  uid: string;
  title: string;
};
export type SoundtrackBase = {
  uid: string;
  title: string;
  releaseDate: string;
  length: number;
};
export type SoundtrackFull = {
  uid: string;
  title: string;
  releaseDate: string;
  length: number;
  labels: CompanyBase[];
  composers: StaffBase[];
  contributors: StaffBase[];
  orchestrators: StaffBase[];
  references: Reference[];
};
export type SoundtrackBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  soundtracks: SoundtrackBase[];
};
export type SoundtrackFullResponse = {
  soundtrack: SoundtrackFull;
};
export type SpacecraftHeader = {
  uid: string;
  name: string;
};
export type SpacecraftBase = {
  uid: string;
  name: string;
  registry: string;
  status: string;
  dateStatus: string;
  spacecraftClass: SpacecraftClassHeader;
  owner: OrganizationHeader;
  operator: OrganizationHeader;
};
export type SpacecraftFull = {
  uid: string;
  name: string;
  registry: string;
  status: string;
  dateStatus: string;
  spacecraftClass: SpacecraftClassBase;
  owner: OrganizationBase;
  operator: OrganizationBase;
  spacecraftTypes: SpacecraftType[];
};
export type SpacecraftBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  spacecrafts: SpacecraftBase[];
};
export type SpacecraftFullResponse = {
  spacecraft: SpacecraftFull;
};
export type SpacecraftClassHeader = {
  uid: string;
  name: string;
};
export type SpacecraftClassBase = {
  uid: string;
  name: string;
  numberOfDecks: number;
  warpCapable: boolean;
  alternateReality: boolean;
  activeFrom: string;
  activeTo: string;
  species: SpeciesHeader;
  owner: OrganizationHeader;
  operator: OrganizationHeader;
  affiliation: OrganizationHeader;
};
export type SpacecraftClassFull = {
  uid: string;
  name: string;
  numberOfDecks: number;
  warpCapable: boolean;
  alternateReality: boolean;
  activeFrom: string;
  activeTo: string;
  species: SpeciesHeader;
  owner: OrganizationBase;
  operator: OrganizationBase;
  affiliation: OrganizationBase;
  spacecraftTypes: SpacecraftType[];
  spacecrafts: SpacecraftBase[];
};
export type SpacecraftClassBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  spacecraftClasses: SpacecraftClassBase[];
};
export type SpacecraftClassFullResponse = {
  spacecraftClass: SpacecraftClassFull;
};
export type SpacecraftType = {
  uid: string;
  name: string;
};
export type SpeciesHeader = {
  uid: string;
  name: string;
};
export type SpeciesBase = {
  uid: string;
  name: string;
  homeworld: AstronomicalObjectHeader;
  quadrant: AstronomicalObjectHeader;
  extinctSpecies: boolean;
  warpCapableSpecies: boolean;
  extraGalacticSpecies: boolean;
  humanoidSpecies: boolean;
  reptilianSpecies: boolean;
  nonCorporealSpecies: boolean;
  shapeshiftingSpecies: boolean;
  spaceborneSpecies: boolean;
  telepathicSpecies: boolean;
  transDimensionalSpecies: boolean;
  unnamedSpecies: boolean;
  alternateReality: boolean;
};
export type SpeciesFull = {
  uid: string;
  name: string;
  homeworld: AstronomicalObjectBase;
  quadrant: AstronomicalObjectBase;
  extinctSpecies: boolean;
  warpCapableSpecies: boolean;
  extraGalacticSpecies: boolean;
  humanoidSpecies: boolean;
  reptilianSpecies: boolean;
  nonCorporealSpecies: boolean;
  shapeshiftingSpecies: boolean;
  spaceborneSpecies: boolean;
  telepathicSpecies: boolean;
  transDimensionalSpecies: boolean;
  unnamedSpecies: boolean;
  alternateReality: boolean;
  characters: CharacterBase[];
};
export type SpeciesBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  species: SpeciesBase[];
};
export type SpeciesFullResponse = {
  species: SpeciesFull;
};
export type StaffHeader = {
  uid: string;
  name: string;
};
export type StaffBase = {
  uid: string;
  name: string;
  birthName: string;
  gender: Gender;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
};
export type StaffFull = {
  uid: string;
  name: string;
  birthName: string;
  gender: Gender;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
  writtenEpisodes: EpisodeBase[];
  teleplayAuthoredEpisodes: EpisodeBase[];
  storyAuthoredEpisodes: EpisodeBase[];
  directedEpisodes: EpisodeBase[];
  episodes: EpisodeBase[];
  writtenMovies: MovieBase[];
  screenplayAuthoredMovies: MovieBase[];
  storyAuthoredMovies: MovieBase[];
  directedMovies: MovieBase[];
  producedMovies: MovieBase[];
  movies: MovieBase[];
};
export type StaffBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  staff: StaffBase[];
};
export type StaffFullResponse = {
  staff: StaffFull;
};
export type TechnologyHeader = {
  uid: string;
  name: string;
};
export type TechnologyBase = {
  uid: string;
  name: string;
  borgTechnology: boolean;
  borgComponent: boolean;
  communicationsTechnology: boolean;
  computerTechnology: boolean;
  computerProgramming: boolean;
  subroutine: boolean;
  database: boolean;
  energyTechnology: boolean;
  fictionalTechnology: boolean;
  holographicTechnology: boolean;
  identificationTechnology: boolean;
  lifeSupportTechnology: boolean;
  sensorTechnology: boolean;
  shieldTechnology: boolean;
  tool: boolean;
  culinaryTool: boolean;
  engineeringTool: boolean;
  householdTool: boolean;
  medicalEquipment: boolean;
  transporterTechnology: boolean;
};
export type TechnologyFull = {
  uid: string;
  name: string;
  borgTechnology: boolean;
  borgComponent: boolean;
  communicationsTechnology: boolean;
  computerTechnology: boolean;
  computerProgramming: boolean;
  subroutine: boolean;
  database: boolean;
  energyTechnology: boolean;
  fictionalTechnology: boolean;
  holographicTechnology: boolean;
  identificationTechnology: boolean;
  lifeSupportTechnology: boolean;
  sensorTechnology: boolean;
  shieldTechnology: boolean;
  tool: boolean;
  culinaryTool: boolean;
  engineeringTool: boolean;
  householdTool: boolean;
  medicalEquipment: boolean;
  transporterTechnology: boolean;
};
export type TechnologyBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  technology: TechnologyBase[];
};
export type TechnologyFullResponse = {
  technology: TechnologyFull;
};
export type TitleHeader = {
  uid: string;
  name: string;
};
export type TitleBase = {
  uid: string;
  name: string;
  militaryRank: boolean;
  fleetRank: boolean;
  religiousTitle: boolean;
  position: boolean;
  mirror: boolean;
};
export type TitleFull = {
  uid: string;
  name: string;
  militaryRank: boolean;
  fleetRank: boolean;
  religiousTitle: boolean;
  position: boolean;
  mirror: boolean;
  characters: CharacterBase[];
};
export type TitleBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  titles: TitleBase[];
};
export type TitleFullResponse = {
  title: TitleFull;
};
export type TradingCardHeader = {
  uid: string;
  name: string;
};
export type TradingCardBase = {
  uid: string;
  name: string;
  number: string;
  releaseYear: number;
  productionRun: number;
  tradingCardSet: TradingCardSetHeader;
  tradingCardDeck: TradingCardDeckHeader;
};
export type TradingCardFull = {
  uid: string;
  name: string;
  tradingCardSet: TradingCardSetBase;
  tradingCardDeck: TradingCardDeckBase;
  number: string;
  releaseYear: number;
  productionRun: number;
};
export type TradingCardBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  tradingCards: TradingCardBase[];
};
export type TradingCardFullResponse = {
  tradingCard: TradingCardFull;
};
export type TradingCardDeckHeader = {
  uid: string;
  name: string;
};
export type TradingCardDeckBase = {
  uid: string;
  name: string;
  frequency: string;
  tradingCardSet: TradingCardSetHeader;
};
export type TradingCardDeckFull = {
  uid: string;
  name: string;
  frequency: string;
  tradingCardSet: TradingCardSetHeader;
  tradingCards: TradingCardBase[];
};
export type TradingCardDeckBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  tradingCardDecks: TradingCardDeckBase[];
};
export type TradingCardDeckFullResponse = {
  tradingCardDeck: TradingCardDeckFull;
};
export type TradingCardSetHeader = {
  uid: string;
  name: string;
};
export type TradingCardSetBase = {
  uid: string;
  name: string;
  releaseYear: number;
  releaseMonth: number;
  releaseDay: number;
  cardsPerPack: number;
  packsPerBox: number;
  boxesPerCase: number;
  productionRun: number;
  productionRunUnit: ProductionRunUnit;
  cardWidth: number;
  cardHeight: number;
};
export type TradingCardSetFull = {
  uid: string;
  name: string;
  releaseYear: number;
  releaseMonth: number;
  releaseDay: number;
  cardsPerPack: number;
  packsPerBox: number;
  boxesPerCase: number;
  productionRun: number;
  productionRunUnit: ProductionRunUnit;
  cardWidth: number;
  cardHeight: number;
  manufacturers: CompanyBase[];
  tradingCardDecks: TradingCardDeckBase[];
  tradingCards: TradingCardBase[];
  countriesOfOrigin: Country[];
};
export type TradingCardSetBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  tradingCardSets: TradingCardSetBase[];
};
export type TradingCardSetFullResponse = {
  tradingCardSet: TradingCardSetFull;
};
export type VideoGameHeader = {
  uid: string;
  title: string;
};
export type VideoGameBase = {
  uid: string;
  title: string;
  releaseDate: string;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  systemRequirements: string;
};
export type VideoGameFull = {
  uid: string;
  title: string;
  releaseDate: string;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  systemRequirements: string;
  publishers: CompanyBase[];
  developers: CompanyBase[];
  platforms: Platform[];
  genres: Genre[];
  ratings: ContentRating[];
  references: Reference[];
};
export type VideoGameBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  videoGames: VideoGameBase[];
};
export type VideoGameFullResponse = {
  videoGame: VideoGameFull;
};
export type VideoReleaseHeader = {
  uid: string;
  title: string;
};
export type VideoReleaseBase = {
  uid: string;
  title: string;
  series: SeriesHeader;
  season: SeasonHeader;
  format: VideoReleaseFormat;
  numberOfEpisodes: number;
  numberOfFeatureLengthEpisodes: number;
  numberOfDataCarriers: number;
  runTime: number;
  yearFrom: number;
  yearTo: number;
  regionFreeReleaseDate: string;
  region1AReleaseDate: string;
  region1SlimlineReleaseDate: string;
  region2BReleaseDate: string;
  region2SlimlineReleaseDate: string;
  region4AReleaseDate: string;
  region4SlimlineReleaseDate: string;
  amazonDigitalRelease: boolean;
  dailymotionDigitalRelease: boolean;
  googlePlayDigitalRelease: boolean;
  iTunesDigitalRelease: boolean;
  ultraVioletDigitalRelease: boolean;
  vimeoDigitalRelease: boolean;
  vuduDigitalRelease: boolean;
  xboxSmartGlassDigitalRelease: boolean;
  youTubeDigitalRelease: boolean;
  netflixDigitalRelease: boolean;
};
export type VideoReleaseFull = {
  uid: string;
  title: string;
  series: SeriesBase;
  season: SeasonBase;
  format: VideoReleaseFormat;
  numberOfEpisodes: number;
  numberOfFeatureLengthEpisodes: number;
  numberOfDataCarriers: number;
  runTime: number;
  yearFrom: number;
  yearTo: number;
  regionFreeReleaseDate: string;
  region1AReleaseDate: string;
  region1SlimlineReleaseDate: string;
  region2BReleaseDate: string;
  region2SlimlineReleaseDate: string;
  region4AReleaseDate: string;
  region4SlimlineReleaseDate: string;
  amazonDigitalRelease: boolean;
  dailymotionDigitalRelease: boolean;
  googlePlayDigitalRelease: boolean;
  iTunesDigitalRelease: boolean;
  ultraVioletDigitalRelease: boolean;
  vimeoDigitalRelease: boolean;
  vuduDigitalRelease: boolean;
  xboxSmartGlassDigitalRelease: boolean;
  youTubeDigitalRelease: boolean;
  netflixDigitalRelease: boolean;
  references: Reference[];
  ratings: ContentRating[];
  languages: ContentLanguage[];
  languagesSubtitles: ContentLanguage[];
  languagesDubbed: ContentLanguage[];
};
export type VideoReleaseBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  videoReleases: VideoReleaseBase[];
};
export type VideoReleaseFullResponse = {
  videoRelease: VideoReleaseFull;
};
export type WeaponHeader = {
  uid: string;
  name: string;
};
export type WeaponBase = {
  uid: string;
  name: string;
  handHeldWeapon: boolean;
  laserTechnology: boolean;
  plasmaTechnology: boolean;
  photonicTechnology: boolean;
  phaserTechnology: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type WeaponFull = {
  uid: string;
  name: string;
  handHeldWeapon: boolean;
  laserTechnology: boolean;
  plasmaTechnology: boolean;
  photonicTechnology: boolean;
  phaserTechnology: boolean;
  mirror: boolean;
  alternateReality: boolean;
};
export type WeaponBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  weapons: WeaponBase[];
};
export type WeaponFullResponse = {
  weapon: WeaponFull;
};
export async function animalUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/animal?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as AnimalFullResponse);
}
export async function animalSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as AnimalBaseResponse);
}
export async function animalSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    earthAnimal: boolean;
    earthInsect: boolean;
    avian: boolean;
    canine: boolean;
    feline: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("earthAnimal", String(req.earthAnimal));
  fd.append("earthInsect", String(req.earthInsect));
  fd.append("avian", String(req.avian));
  fd.append("canine", String(req.canine));
  fd.append("feline", String(req.feline));
  return fetch(
    `/api/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as AnimalBaseResponse);
}
export async function astronomicalObjectUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/astronomicalObject?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) =>
      (await response.json()) as AstronomicalObjectFullResponse,
  );
}
export async function astronomicalObjectSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/astronomicalObject/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) =>
      (await response.json()) as AstronomicalObjectBaseResponse,
  );
}
export async function astronomicalObjectSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    astronomicalObjectType: string;
    locationUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("astronomicalObjectType", req.astronomicalObjectType);
  fd.append("locationUid", req.locationUid);
  return fetch(
    `/api/astronomicalObject/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) =>
      (await response.json()) as AstronomicalObjectBaseResponse,
  );
}
export async function bookUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/book?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as BookFullResponse);
}
export async function bookSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/book/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as BookBaseResponse);
}
export async function bookSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    novel: boolean;
    referenceBook: boolean;
    biographyBook: boolean;
    rolePlayingBook: boolean;
    eBook: boolean;
    anthology: boolean;
    novelization: boolean;
    audiobook: boolean;
    audiobookAbridged: boolean;
    audiobookPublishedYearFrom: number;
    audiobookPublishedYearTo: number;
    audiobookRunTimeFrom: number;
    audiobookRunTimeTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("novel", String(req.novel));
  fd.append("referenceBook", String(req.referenceBook));
  fd.append("biographyBook", String(req.biographyBook));
  fd.append("rolePlayingBook", String(req.rolePlayingBook));
  fd.append("eBook", String(req.eBook));
  fd.append("anthology", String(req.anthology));
  fd.append("novelization", String(req.novelization));
  fd.append("audiobook", String(req.audiobook));
  fd.append("audiobookAbridged", String(req.audiobookAbridged));
  fd.append(
    "audiobookPublishedYearFrom",
    String(req.audiobookPublishedYearFrom),
  );
  fd.append("audiobookPublishedYearTo", String(req.audiobookPublishedYearTo));
  fd.append("audiobookRunTimeFrom", String(req.audiobookRunTimeFrom));
  fd.append("audiobookRunTimeTo", String(req.audiobookRunTimeTo));
  return fetch(
    `/api/book/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as BookBaseResponse);
}
export async function bookCollectionUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/bookCollection?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as BookCollectionFullResponse,
  );
}
export async function bookCollectionSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/bookCollection/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as BookCollectionBaseResponse,
  );
}
export async function bookCollectionSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  return fetch(
    `/api/bookCollection/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as BookCollectionBaseResponse,
  );
}
export async function bookSeriesUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/bookSeries?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as BookSeriesFullResponse,
  );
}
export async function bookSeriesSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/bookSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as BookSeriesBaseResponse);
}
export async function bookSeriesSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfBooksFrom: number;
    numberOfBooksTo: number;
    yearFrom: number;
    yearTo: number;
    miniseries: boolean;
    eBookSeries: boolean;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfBooksFrom", String(req.numberOfBooksFrom));
  fd.append("numberOfBooksTo", String(req.numberOfBooksTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("miniseries", String(req.miniseries));
  fd.append("eBookSeries", String(req.eBookSeries));
  return fetch(
    `/api/bookSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as BookSeriesBaseResponse);
}
export async function characterUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/character?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as CharacterFullResponse);
}
export async function characterSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/character/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as CharacterBaseResponse);
}
export async function characterSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    gender: string;
    deceased: boolean;
    hologram: boolean;
    fictionalCharacter: boolean;
    mirror: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("gender", req.gender);
  fd.append("deceased", String(req.deceased));
  fd.append("hologram", String(req.hologram));
  fd.append("fictionalCharacter", String(req.fictionalCharacter));
  fd.append("mirror", String(req.mirror));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/character/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as CharacterBaseResponse);
}
export async function comicsUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/comics?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as ComicsFullResponse);
}
export async function comicsSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/comics/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as ComicsBaseResponse);
}
export async function comicsSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    photonovel: boolean;
    adaptation: boolean;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("photonovel", String(req.photonovel));
  fd.append("adaptation", String(req.adaptation));
  return fetch(
    `/api/comics/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as ComicsBaseResponse);
}
export async function comicCollectionUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/comicCollection?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as ComicCollectionFullResponse,
  );
}
export async function comicCollectionSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/comicCollection/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as ComicCollectionBaseResponse,
  );
}
export async function comicCollectionSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    photonovel: boolean;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("photonovel", String(req.photonovel));
  return fetch(
    `/api/comicCollection/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as ComicCollectionBaseResponse,
  );
}
export async function comicSeriesUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/comicSeries?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as ComicSeriesFullResponse,
  );
}
export async function comicSeriesSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/comicSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as ComicSeriesBaseResponse,
  );
}
export async function comicSeriesSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfIssuesFrom: number;
    numberOfIssuesTo: number;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    miniseries: boolean;
    photonovelSeries: boolean;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfIssuesFrom", String(req.numberOfIssuesFrom));
  fd.append("numberOfIssuesTo", String(req.numberOfIssuesTo));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("miniseries", String(req.miniseries));
  fd.append("photonovelSeries", String(req.photonovelSeries));
  return fetch(
    `/api/comicSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as ComicSeriesBaseResponse,
  );
}
export async function comicStripUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/comicStrip?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as ComicStripFullResponse,
  );
}
export async function comicStripSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/comicStrip/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as ComicStripBaseResponse);
}
export async function comicStripSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
    yearFrom: number;
    yearTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  return fetch(
    `/api/comicStrip/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as ComicStripBaseResponse);
}
export async function companyUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/company?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as CompanyFullResponse);
}
export async function companySearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/company/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as CompanyBaseResponse);
}
export async function companySearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    broadcaster: boolean;
    collectibleCompany: boolean;
    conglomerate: boolean;
    digitalVisualEffectsCompany: boolean;
    distributor: boolean;
    gameCompany: boolean;
    filmEquipmentCompany: boolean;
    makeUpEffectsStudio: boolean;
    mattePaintingCompany: boolean;
    modelAndMiniatureEffectsCompany: boolean;
    postProductionCompany: boolean;
    productionCompany: boolean;
    propCompany: boolean;
    recordLabel: boolean;
    specialEffectsCompany: boolean;
    tvAndFilmProductionCompany: boolean;
    videoGameCompany: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("broadcaster", String(req.broadcaster));
  fd.append("collectibleCompany", String(req.collectibleCompany));
  fd.append("conglomerate", String(req.conglomerate));
  fd.append(
    "digitalVisualEffectsCompany",
    String(req.digitalVisualEffectsCompany),
  );
  fd.append("distributor", String(req.distributor));
  fd.append("gameCompany", String(req.gameCompany));
  fd.append("filmEquipmentCompany", String(req.filmEquipmentCompany));
  fd.append("makeUpEffectsStudio", String(req.makeUpEffectsStudio));
  fd.append("mattePaintingCompany", String(req.mattePaintingCompany));
  fd.append(
    "modelAndMiniatureEffectsCompany",
    String(req.modelAndMiniatureEffectsCompany),
  );
  fd.append("postProductionCompany", String(req.postProductionCompany));
  fd.append("productionCompany", String(req.productionCompany));
  fd.append("propCompany", String(req.propCompany));
  fd.append("recordLabel", String(req.recordLabel));
  fd.append("specialEffectsCompany", String(req.specialEffectsCompany));
  fd.append(
    "tvAndFilmProductionCompany",
    String(req.tvAndFilmProductionCompany),
  );
  fd.append("videoGameCompany", String(req.videoGameCompany));
  return fetch(
    `/api/company/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as CompanyBaseResponse);
}
export async function conflictUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/conflict?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as ConflictFullResponse);
}
export async function conflictSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/conflict/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as ConflictBaseResponse);
}
export async function conflictSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    yearFrom: number;
    yearTo: number;
    earthConflict: boolean;
    federationWar: boolean;
    klingonWar: boolean;
    dominionWarBattle: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("earthConflict", String(req.earthConflict));
  fd.append("federationWar", String(req.federationWar));
  fd.append("klingonWar", String(req.klingonWar));
  fd.append("dominionWarBattle", String(req.dominionWarBattle));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/conflict/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as ConflictBaseResponse);
}
export async function elementUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/element?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as ElementFullResponse);
}
export async function elementSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/element/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as ElementBaseResponse);
}
export async function elementSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    symbol: string;
    transuranium: boolean;
    gammaSeries: boolean;
    hypersonicSeries: boolean;
    megaSeries: boolean;
    omegaSeries: boolean;
    transonicSeries: boolean;
    worldSeries: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("symbol", req.symbol);
  fd.append("transuranium", String(req.transuranium));
  fd.append("gammaSeries", String(req.gammaSeries));
  fd.append("hypersonicSeries", String(req.hypersonicSeries));
  fd.append("megaSeries", String(req.megaSeries));
  fd.append("omegaSeries", String(req.omegaSeries));
  fd.append("transonicSeries", String(req.transonicSeries));
  fd.append("worldSeries", String(req.worldSeries));
  return fetch(
    `/api/element/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as ElementBaseResponse);
}
export async function episodeUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/episode?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as EpisodeFullResponse);
}
export async function episodeSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/episode/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as EpisodeBaseResponse);
}
export async function episodeSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    seasonNumberFrom: number;
    seasonNumberTo: number;
    episodeNumberFrom: number;
    episodeNumberTo: number;
    productionSerialNumber: string;
    featureLength: boolean;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    usAirDateFrom: string;
    usAirDateTo: string;
    finalScriptDateFrom: string;
    finalScriptDateTo: string;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("seasonNumberFrom", String(req.seasonNumberFrom));
  fd.append("seasonNumberTo", String(req.seasonNumberTo));
  fd.append("episodeNumberFrom", String(req.episodeNumberFrom));
  fd.append("episodeNumberTo", String(req.episodeNumberTo));
  fd.append("productionSerialNumber", req.productionSerialNumber);
  fd.append("featureLength", String(req.featureLength));
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("usAirDateFrom", req.usAirDateFrom);
  fd.append("usAirDateTo", req.usAirDateTo);
  fd.append("finalScriptDateFrom", req.finalScriptDateFrom);
  fd.append("finalScriptDateTo", req.finalScriptDateTo);
  return fetch(
    `/api/episode/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as EpisodeBaseResponse);
}
export async function foodUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/food?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as FoodFullResponse);
}
export async function foodSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/food/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as FoodBaseResponse);
}
export async function foodSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    earthlyOrigin: boolean;
    dessert: boolean;
    fruit: boolean;
    herbOrSpice: boolean;
    sauce: boolean;
    soup: boolean;
    beverage: boolean;
    alcoholicBeverage: boolean;
    juice: boolean;
    tea: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("earthlyOrigin", String(req.earthlyOrigin));
  fd.append("dessert", String(req.dessert));
  fd.append("fruit", String(req.fruit));
  fd.append("herbOrSpice", String(req.herbOrSpice));
  fd.append("sauce", String(req.sauce));
  fd.append("soup", String(req.soup));
  fd.append("beverage", String(req.beverage));
  fd.append("alcoholicBeverage", String(req.alcoholicBeverage));
  fd.append("juice", String(req.juice));
  fd.append("tea", String(req.tea));
  return fetch(
    `/api/food/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as FoodBaseResponse);
}
export async function literatureUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/literature?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as LiteratureFullResponse,
  );
}
export async function literatureSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/literature/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as LiteratureBaseResponse);
}
export async function literatureSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    earthlyOrigin: boolean;
    shakespeareanWork: boolean;
    report: boolean;
    scientificLiterature: boolean;
    technicalManual: boolean;
    religiousLiterature: boolean;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("earthlyOrigin", String(req.earthlyOrigin));
  fd.append("shakespeareanWork", String(req.shakespeareanWork));
  fd.append("report", String(req.report));
  fd.append("scientificLiterature", String(req.scientificLiterature));
  fd.append("technicalManual", String(req.technicalManual));
  fd.append("religiousLiterature", String(req.religiousLiterature));
  return fetch(
    `/api/literature/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as LiteratureBaseResponse);
}
export async function locationUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/location?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as LocationFullResponse);
}
export async function locationSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/location/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as LocationBaseResponse);
}
export async function locationSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    earthlyLocation: boolean;
    fictionalLocation: boolean;
    religiousLocation: boolean;
    geographicalLocation: boolean;
    bodyOfWater: boolean;
    country: boolean;
    subnationalEntity: boolean;
    settlement: boolean;
    usSettlement: boolean;
    bajoranSettlement: boolean;
    colony: boolean;
    landform: boolean;
    landmark: boolean;
    road: boolean;
    structure: boolean;
    shipyard: boolean;
    buildingInterior: boolean;
    establishment: boolean;
    medicalEstablishment: boolean;
    ds9Establishment: boolean;
    school: boolean;
    mirror: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("earthlyLocation", String(req.earthlyLocation));
  fd.append("fictionalLocation", String(req.fictionalLocation));
  fd.append("religiousLocation", String(req.religiousLocation));
  fd.append("geographicalLocation", String(req.geographicalLocation));
  fd.append("bodyOfWater", String(req.bodyOfWater));
  fd.append("country", String(req.country));
  fd.append("subnationalEntity", String(req.subnationalEntity));
  fd.append("settlement", String(req.settlement));
  fd.append("usSettlement", String(req.usSettlement));
  fd.append("bajoranSettlement", String(req.bajoranSettlement));
  fd.append("colony", String(req.colony));
  fd.append("landform", String(req.landform));
  fd.append("landmark", String(req.landmark));
  fd.append("road", String(req.road));
  fd.append("structure", String(req.structure));
  fd.append("shipyard", String(req.shipyard));
  fd.append("buildingInterior", String(req.buildingInterior));
  fd.append("establishment", String(req.establishment));
  fd.append("medicalEstablishment", String(req.medicalEstablishment));
  fd.append("ds9Establishment", String(req.ds9Establishment));
  fd.append("school", String(req.school));
  fd.append("mirror", String(req.mirror));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/location/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as LocationBaseResponse);
}
export async function magazineUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/magazine?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as MagazineFullResponse);
}
export async function magazineSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/magazine/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as MagazineBaseResponse);
}
export async function magazineSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfPagesFrom", String(req.numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(req.numberOfPagesTo));
  return fetch(
    `/api/magazine/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as MagazineBaseResponse);
}
export async function magazineSeriesUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/magazineSeries?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as MagazineSeriesFullResponse,
  );
}
export async function magazineSeriesSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/magazineSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as MagazineSeriesBaseResponse,
  );
}
export async function magazineSeriesSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfIssuesFrom: number;
    numberOfIssuesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("publishedYearFrom", String(req.publishedYearFrom));
  fd.append("publishedYearTo", String(req.publishedYearTo));
  fd.append("numberOfIssuesFrom", String(req.numberOfIssuesFrom));
  fd.append("numberOfIssuesTo", String(req.numberOfIssuesTo));
  return fetch(
    `/api/magazineSeries/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as MagazineSeriesBaseResponse,
  );
}
export async function materialUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/material?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as MaterialFullResponse);
}
export async function materialSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/material/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as MaterialBaseResponse);
}
export async function materialSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    chemicalCompound: boolean;
    biochemicalCompound: boolean;
    drug: boolean;
    poisonousSubstance: boolean;
    explosive: boolean;
    gemstone: boolean;
    alloyOrComposite: boolean;
    fuel: boolean;
    mineral: boolean;
    preciousMaterial: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("chemicalCompound", String(req.chemicalCompound));
  fd.append("biochemicalCompound", String(req.biochemicalCompound));
  fd.append("drug", String(req.drug));
  fd.append("poisonousSubstance", String(req.poisonousSubstance));
  fd.append("explosive", String(req.explosive));
  fd.append("gemstone", String(req.gemstone));
  fd.append("alloyOrComposite", String(req.alloyOrComposite));
  fd.append("fuel", String(req.fuel));
  fd.append("mineral", String(req.mineral));
  fd.append("preciousMaterial", String(req.preciousMaterial));
  return fetch(
    `/api/material/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as MaterialBaseResponse);
}
export async function medicalConditionUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/medicalCondition?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as MedicalConditionFullResponse,
  );
}
export async function medicalConditionSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/medicalCondition/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as MedicalConditionBaseResponse,
  );
}
export async function medicalConditionSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    psychologicalCondition: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("psychologicalCondition", String(req.psychologicalCondition));
  return fetch(
    `/api/medicalCondition/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as MedicalConditionBaseResponse,
  );
}
export async function movieUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/movie?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as MovieFullResponse);
}
export async function movieSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/movie/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as MovieBaseResponse);
}
export async function movieSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    stardateFrom: number;
    stardateTo: number;
    yearFrom: number;
    yearTo: number;
    usReleaseDateFrom: string;
    usReleaseDateTo: string;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("stardateFrom", String(req.stardateFrom));
  fd.append("stardateTo", String(req.stardateTo));
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("usReleaseDateFrom", req.usReleaseDateFrom);
  fd.append("usReleaseDateTo", req.usReleaseDateTo);
  return fetch(
    `/api/movie/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as MovieBaseResponse);
}
export async function occupationUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/occupation?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as OccupationFullResponse,
  );
}
export async function occupationSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/occupation/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as OccupationBaseResponse);
}
export async function occupationSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    legalOccupation: boolean;
    medicalOccupation: boolean;
    scientificOccupation: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("legalOccupation", String(req.legalOccupation));
  fd.append("medicalOccupation", String(req.medicalOccupation));
  fd.append("scientificOccupation", String(req.scientificOccupation));
  return fetch(
    `/api/occupation/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as OccupationBaseResponse);
}
export async function organizationUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/organization?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as OrganizationFullResponse,
  );
}
export async function organizationSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/organization/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as OrganizationBaseResponse,
  );
}
export async function organizationSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    government: boolean;
    intergovernmentalOrganization: boolean;
    researchOrganization: boolean;
    sportOrganization: boolean;
    medicalOrganization: boolean;
    militaryOrganization: boolean;
    militaryUnit: boolean;
    governmentAgency: boolean;
    lawEnforcementAgency: boolean;
    prisonOrPenalColony: boolean;
    mirror: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("government", String(req.government));
  fd.append(
    "intergovernmentalOrganization",
    String(req.intergovernmentalOrganization),
  );
  fd.append("researchOrganization", String(req.researchOrganization));
  fd.append("sportOrganization", String(req.sportOrganization));
  fd.append("medicalOrganization", String(req.medicalOrganization));
  fd.append("militaryOrganization", String(req.militaryOrganization));
  fd.append("militaryUnit", String(req.militaryUnit));
  fd.append("governmentAgency", String(req.governmentAgency));
  fd.append("lawEnforcementAgency", String(req.lawEnforcementAgency));
  fd.append("prisonOrPenalColony", String(req.prisonOrPenalColony));
  fd.append("mirror", String(req.mirror));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/organization/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as OrganizationBaseResponse,
  );
}
export async function performerUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/performer?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as PerformerFullResponse);
}
export async function performerSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/performer/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as PerformerBaseResponse);
}
export async function performerSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    birthName: string;
    gender: string;
    dateOfBirthFrom: string;
    dateOfBirthTo: string;
    placeOfBirth: string;
    dateOfDeathFrom: string;
    dateOfDeathTo: string;
    placeOfDeath: string;
    animalPerformer: boolean;
    disPerformer: boolean;
    ds9Performer: boolean;
    entPerformer: boolean;
    filmPerformer: boolean;
    standInPerformer: boolean;
    stuntPerformer: boolean;
    tasPerformer: boolean;
    tngPerformer: boolean;
    tosPerformer: boolean;
    videoGamePerformer: boolean;
    voicePerformer: boolean;
    voyPerformer: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("birthName", req.birthName);
  fd.append("gender", req.gender);
  fd.append("dateOfBirthFrom", req.dateOfBirthFrom);
  fd.append("dateOfBirthTo", req.dateOfBirthTo);
  fd.append("placeOfBirth", req.placeOfBirth);
  fd.append("dateOfDeathFrom", req.dateOfDeathFrom);
  fd.append("dateOfDeathTo", req.dateOfDeathTo);
  fd.append("placeOfDeath", req.placeOfDeath);
  fd.append("animalPerformer", String(req.animalPerformer));
  fd.append("disPerformer", String(req.disPerformer));
  fd.append("ds9Performer", String(req.ds9Performer));
  fd.append("entPerformer", String(req.entPerformer));
  fd.append("filmPerformer", String(req.filmPerformer));
  fd.append("standInPerformer", String(req.standInPerformer));
  fd.append("stuntPerformer", String(req.stuntPerformer));
  fd.append("tasPerformer", String(req.tasPerformer));
  fd.append("tngPerformer", String(req.tngPerformer));
  fd.append("tosPerformer", String(req.tosPerformer));
  fd.append("videoGamePerformer", String(req.videoGamePerformer));
  fd.append("voicePerformer", String(req.voicePerformer));
  fd.append("voyPerformer", String(req.voyPerformer));
  return fetch(
    `/api/performer/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as PerformerBaseResponse);
}
export async function seasonUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/season?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as SeasonFullResponse);
}
export async function seasonSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/season/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as SeasonBaseResponse);
}
export async function seasonSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    seasonNumberFrom: number;
    seasonNumberTo: number;
    numberOfEpisodesFrom: number;
    numberOfEpisodesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("seasonNumberFrom", String(req.seasonNumberFrom));
  fd.append("seasonNumberTo", String(req.seasonNumberTo));
  fd.append("numberOfEpisodesFrom", String(req.numberOfEpisodesFrom));
  fd.append("numberOfEpisodesTo", String(req.numberOfEpisodesTo));
  return fetch(
    `/api/season/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as SeasonBaseResponse);
}
export async function seriesUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/series?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as SeriesFullResponse);
}
export async function seriesSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/series/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as SeriesBaseResponse);
}
export async function seriesSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    abbreviation: string;
    productionStartYearFrom: number;
    productionStartYearTo: number;
    productionEndYearFrom: number;
    productionEndYearTo: number;
    originalRunStartDateFrom: string;
    originalRunStartDateTo: string;
    originalRunEndDateFrom: string;
    originalRunEndDateTo: string;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("abbreviation", req.abbreviation);
  fd.append("productionStartYearFrom", String(req.productionStartYearFrom));
  fd.append("productionStartYearTo", String(req.productionStartYearTo));
  fd.append("productionEndYearFrom", String(req.productionEndYearFrom));
  fd.append("productionEndYearTo", String(req.productionEndYearTo));
  fd.append("originalRunStartDateFrom", req.originalRunStartDateFrom);
  fd.append("originalRunStartDateTo", req.originalRunStartDateTo);
  fd.append("originalRunEndDateFrom", req.originalRunEndDateFrom);
  fd.append("originalRunEndDateTo", req.originalRunEndDateTo);
  return fetch(
    `/api/series/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as SeriesBaseResponse);
}
export async function soundtrackUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/soundtrack?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as SoundtrackFullResponse,
  );
}
export async function soundtrackSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/soundtrack/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as SoundtrackBaseResponse);
}
export async function soundtrackSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    releaseDateFrom: string;
    releaseDateTo: string;
    lengthFrom: number;
    lengthTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("releaseDateFrom", req.releaseDateFrom);
  fd.append("releaseDateTo", req.releaseDateTo);
  fd.append("lengthFrom", String(req.lengthFrom));
  fd.append("lengthTo", String(req.lengthTo));
  return fetch(
    `/api/soundtrack/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as SoundtrackBaseResponse);
}
export async function spacecraftUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/spacecraft?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as SpacecraftFullResponse,
  );
}
export async function spacecraftSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/spacecraft/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as SpacecraftBaseResponse);
}
export async function spacecraftSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  return fetch(
    `/api/spacecraft/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as SpacecraftBaseResponse);
}
export async function spacecraftClassUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/spacecraftClass?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as SpacecraftClassFullResponse,
  );
}
export async function spacecraftClassSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/spacecraftClass/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as SpacecraftClassBaseResponse,
  );
}
export async function spacecraftClassSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    warpCapableSpecies: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("warpCapableSpecies", String(req.warpCapableSpecies));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/spacecraftClass/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as SpacecraftClassBaseResponse,
  );
}
export async function speciesUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/species?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as SpeciesFullResponse);
}
export async function speciesSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/species/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as SpeciesBaseResponse);
}
export async function speciesSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    extinctSpecies: boolean;
    warpCapableSpecies: boolean;
    extraGalacticSpecies: boolean;
    humanoidSpecies: boolean;
    reptilianSpecies: boolean;
    nonCorporealSpecies: boolean;
    shapeshiftingSpecies: boolean;
    spaceborneSpecies: boolean;
    telepathicSpecies: boolean;
    transDimensionalSpecies: boolean;
    unnamedSpecies: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("extinctSpecies", String(req.extinctSpecies));
  fd.append("warpCapableSpecies", String(req.warpCapableSpecies));
  fd.append("extraGalacticSpecies", String(req.extraGalacticSpecies));
  fd.append("humanoidSpecies", String(req.humanoidSpecies));
  fd.append("reptilianSpecies", String(req.reptilianSpecies));
  fd.append("nonCorporealSpecies", String(req.nonCorporealSpecies));
  fd.append("shapeshiftingSpecies", String(req.shapeshiftingSpecies));
  fd.append("spaceborneSpecies", String(req.spaceborneSpecies));
  fd.append("telepathicSpecies", String(req.telepathicSpecies));
  fd.append("transDimensionalSpecies", String(req.transDimensionalSpecies));
  fd.append("unnamedSpecies", String(req.unnamedSpecies));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/species/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as SpeciesBaseResponse);
}
export async function staffUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/staff?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as StaffFullResponse);
}
export async function staffSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/staff/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as StaffBaseResponse);
}
export async function staffSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    birthName: string;
    gender: string;
    dateOfBirthFrom: string;
    dateOfBirthTo: string;
    placeOfBirth: string;
    dateOfDeathFrom: string;
    dateOfDeathTo: string;
    placeOfDeath: string;
    artDepartment: boolean;
    artDirector: boolean;
    productionDesigner: boolean;
    cameraAndElectricalDepartment: boolean;
    cinematographer: boolean;
    castingDepartment: boolean;
    costumeDepartment: boolean;
    costumeDesigner: boolean;
    director: boolean;
    assistantOrSecondUnitDirector: boolean;
    exhibitAndAttractionStaff: boolean;
    filmEditor: boolean;
    linguist: boolean;
    locationStaff: boolean;
    makeupStaff: boolean;
    musicDepartment: boolean;
    composer: boolean;
    personalAssistant: boolean;
    producer: boolean;
    productionAssociate: boolean;
    productionStaff: boolean;
    publicationStaff: boolean;
    scienceConsultant: boolean;
    soundDepartment: boolean;
    specialAndVisualEffectsStaff: boolean;
    author: boolean;
    audioAuthor: boolean;
    calendarArtist: boolean;
    comicArtist: boolean;
    comicAuthor: boolean;
    comicColorArtist: boolean;
    comicInteriorArtist: boolean;
    comicInkArtist: boolean;
    comicPencilArtist: boolean;
    comicLetterArtist: boolean;
    comicStripArtist: boolean;
    gameArtist: boolean;
    gameAuthor: boolean;
    novelArtist: boolean;
    novelAuthor: boolean;
    referenceArtist: boolean;
    referenceAuthor: boolean;
    publicationArtist: boolean;
    publicationDesigner: boolean;
    publicationEditor: boolean;
    publicityArtist: boolean;
    cbsDigitalStaff: boolean;
    ilmProductionStaff: boolean;
    specialFeaturesStaff: boolean;
    storyEditor: boolean;
    studioExecutive: boolean;
    stuntDepartment: boolean;
    transportationDepartment: boolean;
    videoGameProductionStaff: boolean;
    writer: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("birthName", req.birthName);
  fd.append("gender", req.gender);
  fd.append("dateOfBirthFrom", req.dateOfBirthFrom);
  fd.append("dateOfBirthTo", req.dateOfBirthTo);
  fd.append("placeOfBirth", req.placeOfBirth);
  fd.append("dateOfDeathFrom", req.dateOfDeathFrom);
  fd.append("dateOfDeathTo", req.dateOfDeathTo);
  fd.append("placeOfDeath", req.placeOfDeath);
  fd.append("artDepartment", String(req.artDepartment));
  fd.append("artDirector", String(req.artDirector));
  fd.append("productionDesigner", String(req.productionDesigner));
  fd.append(
    "cameraAndElectricalDepartment",
    String(req.cameraAndElectricalDepartment),
  );
  fd.append("cinematographer", String(req.cinematographer));
  fd.append("castingDepartment", String(req.castingDepartment));
  fd.append("costumeDepartment", String(req.costumeDepartment));
  fd.append("costumeDesigner", String(req.costumeDesigner));
  fd.append("director", String(req.director));
  fd.append(
    "assistantOrSecondUnitDirector",
    String(req.assistantOrSecondUnitDirector),
  );
  fd.append("exhibitAndAttractionStaff", String(req.exhibitAndAttractionStaff));
  fd.append("filmEditor", String(req.filmEditor));
  fd.append("linguist", String(req.linguist));
  fd.append("locationStaff", String(req.locationStaff));
  fd.append("makeupStaff", String(req.makeupStaff));
  fd.append("musicDepartment", String(req.musicDepartment));
  fd.append("composer", String(req.composer));
  fd.append("personalAssistant", String(req.personalAssistant));
  fd.append("producer", String(req.producer));
  fd.append("productionAssociate", String(req.productionAssociate));
  fd.append("productionStaff", String(req.productionStaff));
  fd.append("publicationStaff", String(req.publicationStaff));
  fd.append("scienceConsultant", String(req.scienceConsultant));
  fd.append("soundDepartment", String(req.soundDepartment));
  fd.append(
    "specialAndVisualEffectsStaff",
    String(req.specialAndVisualEffectsStaff),
  );
  fd.append("author", String(req.author));
  fd.append("audioAuthor", String(req.audioAuthor));
  fd.append("calendarArtist", String(req.calendarArtist));
  fd.append("comicArtist", String(req.comicArtist));
  fd.append("comicAuthor", String(req.comicAuthor));
  fd.append("comicColorArtist", String(req.comicColorArtist));
  fd.append("comicInteriorArtist", String(req.comicInteriorArtist));
  fd.append("comicInkArtist", String(req.comicInkArtist));
  fd.append("comicPencilArtist", String(req.comicPencilArtist));
  fd.append("comicLetterArtist", String(req.comicLetterArtist));
  fd.append("comicStripArtist", String(req.comicStripArtist));
  fd.append("gameArtist", String(req.gameArtist));
  fd.append("gameAuthor", String(req.gameAuthor));
  fd.append("novelArtist", String(req.novelArtist));
  fd.append("novelAuthor", String(req.novelAuthor));
  fd.append("referenceArtist", String(req.referenceArtist));
  fd.append("referenceAuthor", String(req.referenceAuthor));
  fd.append("publicationArtist", String(req.publicationArtist));
  fd.append("publicationDesigner", String(req.publicationDesigner));
  fd.append("publicationEditor", String(req.publicationEditor));
  fd.append("publicityArtist", String(req.publicityArtist));
  fd.append("cbsDigitalStaff", String(req.cbsDigitalStaff));
  fd.append("ilmProductionStaff", String(req.ilmProductionStaff));
  fd.append("specialFeaturesStaff", String(req.specialFeaturesStaff));
  fd.append("storyEditor", String(req.storyEditor));
  fd.append("studioExecutive", String(req.studioExecutive));
  fd.append("stuntDepartment", String(req.stuntDepartment));
  fd.append("transportationDepartment", String(req.transportationDepartment));
  fd.append("videoGameProductionStaff", String(req.videoGameProductionStaff));
  fd.append("writer", String(req.writer));
  return fetch(
    `/api/staff/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as StaffBaseResponse);
}
export async function technologyUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/technology?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as TechnologyFullResponse,
  );
}
export async function technologySearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/technology/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as TechnologyBaseResponse);
}
export async function technologySearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    borgTechnology: boolean;
    borgComponent: boolean;
    communicationsTechnology: boolean;
    computerTechnology: boolean;
    computerProgramming: boolean;
    subroutine: boolean;
    database: boolean;
    energyTechnology: boolean;
    fictionalTechnology: boolean;
    holographicTechnology: boolean;
    identificationTechnology: boolean;
    lifeSupportTechnology: boolean;
    sensorTechnology: boolean;
    shieldTechnology: boolean;
    tool: boolean;
    culinaryTool: boolean;
    engineeringTool: boolean;
    householdTool: boolean;
    medicalEquipment: boolean;
    transporterTechnology: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("borgTechnology", String(req.borgTechnology));
  fd.append("borgComponent", String(req.borgComponent));
  fd.append("communicationsTechnology", String(req.communicationsTechnology));
  fd.append("computerTechnology", String(req.computerTechnology));
  fd.append("computerProgramming", String(req.computerProgramming));
  fd.append("subroutine", String(req.subroutine));
  fd.append("database", String(req.database));
  fd.append("energyTechnology", String(req.energyTechnology));
  fd.append("fictionalTechnology", String(req.fictionalTechnology));
  fd.append("holographicTechnology", String(req.holographicTechnology));
  fd.append("identificationTechnology", String(req.identificationTechnology));
  fd.append("lifeSupportTechnology", String(req.lifeSupportTechnology));
  fd.append("sensorTechnology", String(req.sensorTechnology));
  fd.append("shieldTechnology", String(req.shieldTechnology));
  fd.append("tool", String(req.tool));
  fd.append("culinaryTool", String(req.culinaryTool));
  fd.append("engineeringTool", String(req.engineeringTool));
  fd.append("householdTool", String(req.householdTool));
  fd.append("medicalEquipment", String(req.medicalEquipment));
  fd.append("transporterTechnology", String(req.transporterTechnology));
  return fetch(
    `/api/technology/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as TechnologyBaseResponse);
}
export async function titleUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/title?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as TitleFullResponse);
}
export async function titleSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/title/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as TitleBaseResponse);
}
export async function titleSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    militaryRank: boolean;
    fleetRank: boolean;
    religiousTitle: boolean;
    position: boolean;
    mirror: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("militaryRank", String(req.militaryRank));
  fd.append("fleetRank", String(req.fleetRank));
  fd.append("religiousTitle", String(req.religiousTitle));
  fd.append("position", String(req.position));
  fd.append("mirror", String(req.mirror));
  return fetch(
    `/api/title/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as TitleBaseResponse);
}
export async function tradingCardUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/tradingCard?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as TradingCardFullResponse,
  );
}
export async function tradingCardSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/tradingCard/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as TradingCardBaseResponse,
  );
}
export async function tradingCardSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    tradingCardDeckUid: string;
    tradingCardSetUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("tradingCardDeckUid", req.tradingCardDeckUid);
  fd.append("tradingCardSetUid", req.tradingCardSetUid);
  return fetch(
    `/api/tradingCard/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as TradingCardBaseResponse,
  );
}
export async function tradingCardDeckUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/tradingCardDeck?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as TradingCardDeckFullResponse,
  );
}
export async function tradingCardDeckSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/tradingCardDeck/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as TradingCardDeckBaseResponse,
  );
}
export async function tradingCardDeckSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    tradingCardSetUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("tradingCardSetUid", req.tradingCardSetUid);
  return fetch(
    `/api/tradingCardDeck/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as TradingCardDeckBaseResponse,
  );
}
export async function tradingCardSetUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/tradingCardSet?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as TradingCardSetFullResponse,
  );
}
export async function tradingCardSetSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/tradingCardSet/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as TradingCardSetBaseResponse,
  );
}
export async function tradingCardSetSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    releaseYearFrom: number;
    releaseYearTo: number;
    cardsPerPackFrom: number;
    cardsPerPackTo: number;
    packsPerBoxFrom: number;
    packsPerBoxTo: number;
    boxesPerCaseFrom: number;
    boxesPerCaseTo: number;
    productionRunFrom: number;
    productionRunTo: number;
    productionRunUnit: string;
    cardWidthFrom: number;
    cardWidthTo: number;
    cardHeightFrom: number;
    cardHeightTo: number;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("releaseYearFrom", String(req.releaseYearFrom));
  fd.append("releaseYearTo", String(req.releaseYearTo));
  fd.append("cardsPerPackFrom", String(req.cardsPerPackFrom));
  fd.append("cardsPerPackTo", String(req.cardsPerPackTo));
  fd.append("packsPerBoxFrom", String(req.packsPerBoxFrom));
  fd.append("packsPerBoxTo", String(req.packsPerBoxTo));
  fd.append("boxesPerCaseFrom", String(req.boxesPerCaseFrom));
  fd.append("boxesPerCaseTo", String(req.boxesPerCaseTo));
  fd.append("productionRunFrom", String(req.productionRunFrom));
  fd.append("productionRunTo", String(req.productionRunTo));
  fd.append("productionRunUnit", req.productionRunUnit);
  fd.append("cardWidthFrom", String(req.cardWidthFrom));
  fd.append("cardWidthTo", String(req.cardWidthTo));
  fd.append("cardHeightFrom", String(req.cardHeightFrom));
  fd.append("cardHeightTo", String(req.cardHeightTo));
  return fetch(
    `/api/tradingCardSet/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as TradingCardSetBaseResponse,
  );
}
export async function videoGameUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/videoGame?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as VideoGameFullResponse);
}
export async function videoGameSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/videoGame/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as VideoGameBaseResponse);
}
export async function videoGameSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    releaseDateFrom: string;
    releaseDateTo: string;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("releaseDateFrom", req.releaseDateFrom);
  fd.append("releaseDateTo", req.releaseDateTo);
  return fetch(
    `/api/videoGame/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as VideoGameBaseResponse);
}
export async function videoReleaseUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/videoRelease?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(
    async (response) => (await response.json()) as VideoReleaseFullResponse,
  );
}
export async function videoReleaseSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/videoRelease/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as VideoReleaseBaseResponse,
  );
}
export async function videoReleaseSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    title: string;
    yearFrom: number;
    yearTo: number;
    runTimeFrom: number;
    runTimeTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", req.title);
  fd.append("yearFrom", String(req.yearFrom));
  fd.append("yearTo", String(req.yearTo));
  fd.append("runTimeFrom", String(req.runTimeFrom));
  fd.append("runTimeTo", String(req.runTimeTo));
  return fetch(
    `/api/videoRelease/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(
    async (response) => (await response.json()) as VideoReleaseBaseResponse,
  );
}
export async function weaponUsingGet({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(`/api/weapon?uid=${uid}&apiKey=${apiKey}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as WeaponFullResponse);
}
export async function weaponSearchUsingGet({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/api/weapon/search?pageNumber=${pageNumber}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
    },
  ).then(async (response) => (await response.json()) as WeaponBaseResponse);
}
export async function weaponSearchUsingPost(
  {
    pageNumber,
    pageSize,
    sort,
    apiKey,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    apiKey?: string;
  },
  req: {
    name: string;
    handHeldWeapon: boolean;
    laserTechnology: boolean;
    plasmaTechnology: boolean;
    photonicTechnology: boolean;
    phaserTechnology: boolean;
    mirror: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", req.name);
  fd.append("handHeldWeapon", String(req.handHeldWeapon));
  fd.append("laserTechnology", String(req.laserTechnology));
  fd.append("plasmaTechnology", String(req.plasmaTechnology));
  fd.append("photonicTechnology", String(req.photonicTechnology));
  fd.append("phaserTechnology", String(req.phaserTechnology));
  fd.append("mirror", String(req.mirror));
  fd.append("alternateReality", String(req.alternateReality));
  return fetch(
    `/api/weapon/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&apiKey=${apiKey}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (response) => (await response.json()) as WeaponBaseResponse);
}
