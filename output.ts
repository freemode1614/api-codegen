/**
 * 1.0.0
 * STAPI
 *
 */

export type AnimalHeader = {
  uid: string;
  name: string;
};

export type AnimalBase = {
  uid: string;
  name: string;
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
};

export type AnimalFull = {
  uid: string;
  name: string;
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
};

export type AnimalBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  animals?: AnimalBase[];
};

export type AnimalFullResponse = {
  animal?: AnimalFull;
};

export type AstronomicalObjectHeader = {
  uid: string;
  name: string;
};

export type AstronomicalObjectBase = {
  uid: string;
  name: string;
  astronomicalObjectType?: AstronomicalObjectType;
  location?: AstronomicalObjectHeader;
};

export type AstronomicalObjectFull = {
  uid: string;
  name: string;
  astronomicalObjectType?: AstronomicalObjectType;
  location?: AstronomicalObjectBase;
  astronomicalObjects?: AstronomicalObjectBase[];
};

export type AstronomicalObjectBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  astronomicalObjects?: AstronomicalObjectBase[];
};

export type AstronomicalObjectFullResponse = {
  astronomicalObject?: AstronomicalObjectFull;
};

export type AstronomicalObjectType =
  | "PLANET"
  | "D_CLASS_PLANET"
  | "H_CLASS_PLANET"
  | "GAS_GIANT_PLANET"
  | "K_CLASS_PLANET"
  | "L_CLASS_PLANET"
  | "M_CLASS_PLANET"
  | "Y_CLASS_PLANET"
  | "ROGUE_PLANET"
  | "ARTIFICIAL_PLANET"
  | "ASTEROID"
  | "ASTEROIDAL_MOON"
  | "ASTEROID_BELT"
  | "CLUSTER"
  | "COMET"
  | "CONSTELLATION"
  | "GALAXY"
  | "MOON"
  | "M_CLASS_MOON"
  | "NEBULA"
  | "PLANETOID"
  | "D_CLASS_PLANETOID"
  | "QUASAR"
  | "STAR"
  | "STAR_SYSTEM"
  | "SECTOR"
  | "REGION";

export type BloodType = "B_NEGATIVE" | "O_NEGATIVE" | "T_NEGATIVE";

export type BookHeader = {
  uid: string;
  title: string;
};

export type BookBase = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  novel: boolean;
  referenceBook: boolean;
  biographyBook: boolean;
  rolePlayingBook: boolean;
  eBook: boolean;
  anthology: boolean;
  novelization: boolean;
  audiobook: boolean;
  audiobookAbridged: boolean;
  audiobookPublishedYear?: number;
  audiobookPublishedMonth?: number;
  audiobookPublishedDay?: number;
  audiobookRunTime?: number;
  productionNumber?: string;
};

export type BookFull = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  novel: boolean;
  referenceBook: boolean;
  biographyBook: boolean;
  rolePlayingBook: boolean;
  eBook: boolean;
  anthology: boolean;
  novelization: boolean;
  audiobook: boolean;
  audiobookAbridged: boolean;
  audiobookPublishedYear?: number;
  audiobookPublishedMonth?: number;
  audiobookPublishedDay?: number;
  audiobookRunTime?: number;
  productionNumber?: string;
  bookSeries?: BookSeriesBase[];
  authors?: StaffBase[];
  artists?: StaffBase[];
  editors?: StaffBase[];
  audiobookNarrators?: StaffBase[];
  publishers?: CompanyBase[];
  audiobookPublishers?: CompanyBase[];
  characters?: CharacterBase[];
  references?: Reference[];
  audiobookReferences?: Reference[];
  bookCollections?: BookCollectionBase[];
};

export type BookBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  books?: BookBase[];
};

export type BookFullResponse = {
  book?: BookFull;
};

export type BookCollectionHeader = {
  uid?: string;
  title?: string;
};

export type BookCollectionBase = {
  uid?: string;
  title?: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
};

export type BookCollectionFull = {
  uid?: string;
  title?: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  bookSeries?: BookSeriesBase[];
  authors?: StaffBase[];
  artists?: StaffBase[];
  editors?: StaffBase[];
  publishers?: CompanyBase[];
  characters?: CharacterBase[];
  references?: Reference[];
  books?: BookBase[];
};

export type BookCollectionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  bookCollections?: BookCollectionBase[];
};

export type BookCollectionFullResponse = {
  bookCollection?: BookCollectionFull;
};

export type BookSeriesHeader = {
  uid?: string;
  title?: string;
};

export type BookSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  numberOfBooks?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  eBookSeries?: boolean;
};

export type BookSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  numberOfBooks?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  eBookSeries?: boolean;
  parentSeries?: BookSeriesBase[];
  childSeries?: BookSeriesBase[];
  publishers?: CompanyBase[];
  books?: BookBase[];
};

export type BookSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  bookSeries?: BookSeriesBase[];
};

export type BookSeriesFullResponse = {
  bookSeries?: BookSeriesFull;
};

export type CharacterHeader = {
  uid: string;
  name: string;
};

export type CharacterBase = {
  uid: string;
  name: string;
  gender?: Gender;
  yearOfBirth?: number;
  monthOfBirth?: number;
  dayOfBirth?: number;
  placeOfBirth?: string;
  yearOfDeath?: number;
  monthOfDeath?: number;
  dayOfDeath?: number;
  placeOfDeath?: string;
  height?: number;
  weight?: number;
  deceased?: boolean;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  serialNumber?: string;
  hologramActivationDate?: string;
  hologramStatus?: string;
  hologramDateStatus?: string;
  hologram?: boolean;
  fictionalCharacter?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type CharacterFull = {
  uid: string;
  name: string;
  gender?: Gender;
  yearOfBirth?: number;
  monthOfBirth?: number;
  dayOfBirth?: number;
  placeOfBirth?: string;
  yearOfDeath?: number;
  monthOfDeath?: number;
  dayOfDeath?: number;
  placeOfDeath?: string;
  height?: number;
  weight?: number;
  deceased?: boolean;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  serialNumber?: string;
  hologramActivationDate?: string;
  hologramStatus?: string;
  hologramDateStatus?: string;
  hologram?: boolean;
  fictionalCharacter?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
  performers?: PerformerBase[];
  episodes?: EpisodeBase[];
  movies?: MovieBase[];
  characterSpecies?: CharacterSpecies[];
  characterRelations?: CharacterRelation[];
  titles?: TitleBase[];
  occupations?: OccupationBase[];
  organizations?: OrganizationBase[];
};

export type CharacterBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  characters?: CharacterBase[];
};

export type CharacterFullResponse = {
  character?: CharacterFull;
};

export type CharacterRelation = {
  typeObject?: string;
  source?: CharacterHeader;
  target?: CharacterHeader;
};

export type CharacterSpecies = {
  uid?: string;
  name?: string;
  numerator?: number;
  denominator?: number;
};

export type ComicsHeader = {
  uid: string;
  title: string;
};

export type ComicsBase = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
  adaptation?: boolean;
};

export type ComicsFull = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
  adaptation?: boolean;
  comicSeries?: ComicSeriesBase[];
  writers?: StaffBase[];
  artists?: StaffBase[];
  editors?: StaffBase[];
  staff?: StaffBase[];
  publishers?: CompanyBase[];
  characters?: CharacterBase[];
  references?: Reference[];
  comicCollections?: ComicCollectionBase[];
};

export type ComicsBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  comics?: ComicsBase[];
};

export type ComicsFullResponse = {
  comics?: ComicsFull;
};

export type ComicCollectionHeader = {
  uid: string;
  title: string;
};

export type ComicCollectionBase = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
};

export type ComicCollectionFull = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
  comicSeries?: ComicSeriesBase[];
  writers?: StaffBase[];
  artists?: StaffBase[];
  editors?: StaffBase[];
  staff?: StaffBase[];
  publishers?: CompanyBase[];
  characters?: CharacterBase[];
  references?: Reference[];
  comics?: ComicsBase[];
};

export type ComicCollectionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  comicCollections?: ComicCollectionBase[];
};

export type ComicCollectionFullResponse = {
  comicCollection?: ComicCollectionFull;
};

export type ComicSeriesHeader = {
  uid: string;
  title: string;
};

export type ComicSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedDayFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  publishedDayTo?: number;
  numberOfIssues?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  photonovelSeries?: boolean;
};

export type ComicSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedDayFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  publishedDayTo?: number;
  numberOfIssues?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  photonovelSeries?: boolean;
  parentSeries?: ComicSeriesBase[];
  childSeries?: ComicSeriesBase[];
  publishers?: CompanyBase[];
  comics?: ComicsBase[];
};

export type ComicSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  comicSeries?: ComicSeriesBase[];
};

export type ComicSeriesFullResponse = {
  comicSeries?: ComicSeriesFull;
};

export type ComicStripHeader = {
  uid: string;
  title: string;
};

export type ComicStripBase = {
  uid: string;
  title: string;
  periodical?: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedDayFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  publishedDayTo?: number;
  numberOfPages?: number;
  yearFrom?: number;
  yearTo?: number;
};

export type ComicStripFull = {
  uid: string;
  title: string;
  periodical?: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedDayFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  publishedDayTo?: number;
  numberOfPages?: number;
  yearFrom?: number;
  yearTo?: number;
  comicSeries?: ComicSeriesBase[];
  writers?: StaffBase[];
  artists?: StaffBase[];
  characters?: CharacterBase[];
};

export type ComicStripBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  comicStrips?: ComicStripBase[];
};

export type ComicStripFullResponse = {
  comicStrip?: ComicStripFull;
};

export type CompanyBase = {
  uid: string;
  name: string;
  broadcaster?: boolean;
  collectibleCompany?: boolean;
  conglomerate?: boolean;
  digitalVisualEffectsCompany?: boolean;
  distributor?: boolean;
  gameCompany?: boolean;
  filmEquipmentCompany?: boolean;
  makeUpEffectsStudio?: boolean;
  mattePaintingCompany?: boolean;
  modelAndMiniatureEffectsCompany?: boolean;
  postProductionCompany?: boolean;
  productionCompany?: boolean;
  propCompany?: boolean;
  recordLabel?: boolean;
  specialEffectsCompany?: boolean;
  tvAndFilmProductionCompany?: boolean;
  videoGameCompany?: boolean;
};

export type CompanyFull = {
  uid: string;
  name: string;
  broadcaster?: boolean;
  collectibleCompany?: boolean;
  conglomerate?: boolean;
  digitalVisualEffectsCompany?: boolean;
  distributor?: boolean;
  gameCompany?: boolean;
  filmEquipmentCompany?: boolean;
  makeUpEffectsStudio?: boolean;
  mattePaintingCompany?: boolean;
  modelAndMiniatureEffectsCompany?: boolean;
  postProductionCompany?: boolean;
  productionCompany?: boolean;
  propCompany?: boolean;
  recordLabel?: boolean;
  specialEffectsCompany?: boolean;
  tvAndFilmProductionCompany?: boolean;
  videoGameCompany?: boolean;
};

export type CompanyHeader = {
  uid: string;
  name: string;
};

export type CompanyBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  companies?: CompanyBase[];
};

export type CompanyFullResponse = {
  company?: CompanyFull;
};

export type ConflictBase = {
  uid: string;
  name: string;
  yearFrom?: number;
  yearTo?: number;
  earthConflict?: boolean;
  federationWar?: boolean;
  klingonWar?: boolean;
  dominionWarBattle?: boolean;
  alternateReality?: boolean;
};

export type ConflictFull = {
  uid: string;
  name: string;
  yearFrom?: number;
  yearTo?: number;
  earthConflict?: boolean;
  federationWar?: boolean;
  klingonWar?: boolean;
  dominionWarBattle?: boolean;
  alternateReality?: boolean;
  locations?: LocationBase[];
  firstSideBelligerents?: OrganizationBase[];
  firstSideCommanders?: CharacterBase[];
  secondSideBelligerents?: OrganizationBase[];
  secondSideCommanders?: CharacterBase[];
};

export type ConflictHeader = {
  uid: string;
  name: string;
};

export type ConflictBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  conflicts?: ConflictBase[];
};

export type ConflictFullResponse = {
  conflict?: ConflictFull;
};

export type ContentLanguage = {
  uid?: string;
  name?: string;
  iso6391Code?: string;
};

export type ContentRatingSystem =
  | "BBFC"
  | "OFLC"
  | "OFLCNZ"
  | "DJCTQ"
  | "MDA"
  | "MPAA"
  | "CHVRS"
  | "RCQ"
  | "IFCO"
  | "FSK"
  | "NICAM"
  | "MCCYP"
  | "EIRIN"
  | "HK"
  | "CBFC"
  | "NMHH"
  | "VRC"
  | "RSAC"
  | "ESRB"
  | "ELSPA"
  | "PEGI"
  | "USK"
  | "SELL"
  | "ADESE"
  | "GSRR"
  | "ITUNES";

export type ContentRating = {
  uid?: string;
  contentRatingSystem?: ContentRatingSystem;
  rating?: string;
};

export type Country = {
  uid?: string;
  name?: string;
  iso31661Alpha2Code?: string;
};

export type ElementHeader = {
  uid: string;
  name: string;
};

export type ElementBase = {
  uid: string;
  name: string;
  symbolObject?: string;
  atomicNumber?: number;
  atomicWeight?: number;
  transuranium?: boolean;
  gammaSeries?: boolean;
  hypersonicSeries?: boolean;
  megaSeries?: boolean;
  omegaSeries?: boolean;
  transonicSeries?: boolean;
  worldSeries?: boolean;
};

export type ElementFull = {
  uid: string;
  name: string;
  symbolObject?: string;
  atomicNumber?: number;
  atomicWeight?: number;
  transuranium?: boolean;
  gammaSeries?: boolean;
  hypersonicSeries?: boolean;
  megaSeries?: boolean;
  omegaSeries?: boolean;
  transonicSeries?: boolean;
  worldSeries?: boolean;
};

export type ElementBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  elements?: ElementBase[];
};

export type ElementFullResponse = {
  element?: ElementFull;
};

export type EpisodeHeader = {
  uid: string;
  title: string;
};

export type EpisodeBase = {
  uid: string;
  title: string;
  titleGerman?: string;
  titleItalian?: string;
  titleJapanese?: string;
  series?: SeriesHeader;
  season?: SeasonHeader;
  seasonNumber?: number;
  episodeNumber?: number;
  productionSerialNumber?: string;
  featureLength?: boolean;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usAirDate?: string;
  finalScriptDate?: string;
};

export type EpisodeFull = {
  uid: string;
  title: string;
  titleGerman?: string;
  titleItalian?: string;
  titleJapanese?: string;
  series?: SeriesBase;
  season?: SeasonBase;
  seasonNumber?: number;
  episodeNumber?: number;
  productionSerialNumber?: string;
  featureLength?: boolean;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usAirDate?: string;
  finalScriptDate?: string;
  writers?: StaffBase[];
  teleplayAuthors?: StaffBase[];
  storyAuthors?: StaffBase[];
  directors?: StaffBase[];
  performers?: PerformerBase[];
  stuntPerformers?: PerformerBase[];
  standInPerformers?: PerformerBase[];
  characters?: CharacterBase[];
};

export type EpisodeBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  episodes?: EpisodeBase[];
};

export type EpisodeFullResponse = {
  episode?: EpisodeFull;
};

export type Error = {
  code?: string;
  message?: string;
};

export type FoodHeader = {
  uid: string;
  name: string;
};

export type FoodBase = {
  uid: string;
  name: string;
  earthlyOrigin?: boolean;
  dessert?: boolean;
  fruit?: boolean;
  herbOrSpice?: boolean;
  sauce?: boolean;
  soup?: boolean;
  beverage?: boolean;
  alcoholicBeverage?: boolean;
  juice?: boolean;
  tea?: boolean;
};

export type FoodFull = {
  uid: string;
  name: string;
  earthlyOrigin?: boolean;
  dessert?: boolean;
  fruit?: boolean;
  herbOrSpice?: boolean;
  sauce?: boolean;
  soup?: boolean;
  beverage?: boolean;
  alcoholicBeverage?: boolean;
  juice?: boolean;
  tea?: boolean;
};

export type FoodBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  foods?: FoodBase[];
};

export type FoodFullResponse = {
  food?: FoodFull;
};

export type Gender = "F" | "M";

export type Genre = {
  uid?: string;
  name?: string;
};

export type LiteratureHeader = {
  uid: string;
  title: string;
};

export type LiteratureBase = {
  uid: string;
  title: string;
  earthlyOrigin?: boolean;
  shakespeareanWork?: boolean;
  report?: boolean;
  scientificLiterature?: boolean;
  technicalManual?: boolean;
  religiousLiterature?: boolean;
};

export type LiteratureFull = {
  uid: string;
  title: string;
  earthlyOrigin?: boolean;
  shakespeareanWork?: boolean;
  report?: boolean;
  scientificLiterature?: boolean;
  technicalManual?: boolean;
  religiousLiterature?: boolean;
};

export type LiteratureBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  literature?: LiteratureBase[];
};

export type LiteratureFullResponse = {
  literature?: LiteratureFull;
};

export type LocationHeader = {
  uid: string;
  name: string;
};

export type LocationBase = {
  uid: string;
  name: string;
  earthlyLocation?: boolean;
  fictionalLocation?: boolean;
  religiousLocation?: boolean;
  geographicalLocation?: boolean;
  bodyOfWater?: boolean;
  country?: boolean;
  subnationalEntity?: boolean;
  settlement?: boolean;
  usSettlement?: boolean;
  bajoranSettlement?: boolean;
  colony?: boolean;
  landform?: boolean;
  landmark?: boolean;
  road?: boolean;
  structure?: boolean;
  shipyard?: boolean;
  buildingInterior?: boolean;
  establishment?: boolean;
  medicalEstablishment?: boolean;
  ds9Establishment?: boolean;
  school?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type LocationFull = {
  uid: string;
  name: string;
  earthlyLocation?: boolean;
  fictionalLocation?: boolean;
  religiousLocation?: boolean;
  geographicalLocation?: boolean;
  bodyOfWater?: boolean;
  country?: boolean;
  subnationalEntity?: boolean;
  settlement?: boolean;
  usSettlement?: boolean;
  bajoranSettlement?: boolean;
  colony?: boolean;
  landform?: boolean;
  landmark?: boolean;
  road?: boolean;
  structure?: boolean;
  shipyard?: boolean;
  buildingInterior?: boolean;
  establishment?: boolean;
  medicalEstablishment?: boolean;
  ds9Establishment?: boolean;
  school?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type LocationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  locations?: LocationBase[];
};

export type LocationFullResponse = {
  location?: LocationFull;
};

export type MagazineHeader = {
  uid: string;
  title: string;
};

export type MagazineBase = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  issueNumber?: string;
};

export type MagazineFull = {
  uid: string;
  title: string;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  coverYear?: number;
  coverMonth?: number;
  coverDay?: number;
  numberOfPages?: number;
  issueNumber?: string;
  magazineSeries?: MagazineSeriesBase[];
  editors?: StaffBase[];
  publishers?: CompanyBase[];
};

export type MagazineBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  magazines?: MagazineBase[];
};

export type MagazineFullResponse = {
  magazine?: MagazineFull;
};

export type MagazineSeriesHeader = {
  uid: string;
  title: string;
};

export type MagazineSeriesBase = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  numberOfIssues?: number;
};

export type MagazineSeriesFull = {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedMonthFrom?: number;
  publishedYearTo?: number;
  publishedMonthTo?: number;
  numberOfIssues?: number;
  publishers?: CompanyBase[];
  editors?: StaffBase[];
  magazines?: MagazineBase[];
};

export type MagazineSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  magazineSeries?: MagazineSeriesBase[];
};

export type MagazineSeriesFullResponse = {
  magazineSeries?: MagazineSeriesFull;
};

export type MaritalStatus =
  | "SINGLE"
  | "ENGAGED"
  | "MARRIED"
  | "DIVORCED"
  | "REMARRIED"
  | "SEPARATED"
  | "WIDOWED"
  | "CAPTAINS_WOMAN";

export type MaterialHeader = {
  uid: string;
  name: string;
};

export type MaterialBase = {
  uid: string;
  name: string;
  chemicalCompound?: boolean;
  biochemicalCompound?: boolean;
  drug?: boolean;
  poisonousSubstance?: boolean;
  explosive?: boolean;
  gemstone?: boolean;
  alloyOrComposite?: boolean;
  fuel?: boolean;
  mineral?: boolean;
  preciousMaterial?: boolean;
};

export type MaterialFull = {
  uid: string;
  name: string;
  chemicalCompound?: boolean;
  biochemicalCompound?: boolean;
  drug?: boolean;
  poisonousSubstance?: boolean;
  explosive?: boolean;
  gemstone?: boolean;
  alloyOrComposite?: boolean;
  fuel?: boolean;
  mineral?: boolean;
  preciousMaterial?: boolean;
};

export type MaterialBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  materials?: MaterialBase[];
};

export type MaterialFullResponse = {
  material?: MaterialFull;
};

export type MedicalConditionHeader = {
  uid: string;
  name: string;
};

export type MedicalConditionBase = {
  uid: string;
  name: string;
  psychologicalCondition?: boolean;
};

export type MedicalConditionFull = {
  uid: string;
  name: string;
  psychologicalCondition?: boolean;
};

export type MedicalConditionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  medicalConditions?: MedicalConditionBase[];
};

export type MedicalConditionFullResponse = {
  medicalCondition?: MedicalConditionFull;
};

export type MovieHeader = {
  uid: string;
  title: string;
};

export type MovieBase = {
  uid: string;
  title: string;
  mainDirector?: StaffHeader;
  titleBulgarian?: string;
  titleCatalan?: string;
  titleChineseTraditional?: string;
  titleGerman?: string;
  titleItalian?: string;
  titleJapanese?: string;
  titlePolish?: string;
  titleRussian?: string;
  titleSerbian?: string;
  titleSpanish?: string;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usReleaseDate?: string;
};

export type MovieFull = {
  uid: string;
  title: string;
  mainDirector?: StaffBase;
  titleBulgarian?: string;
  titleCatalan?: string;
  titleChineseTraditional?: string;
  titleGerman?: string;
  titleItalian?: string;
  titleJapanese?: string;
  titlePolish?: string;
  titleRussian?: string;
  titleSerbian?: string;
  titleSpanish?: string;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usReleaseDate?: string;
  writers?: StaffBase[];
  screenplayAuthors?: StaffBase[];
  storyAuthors?: StaffBase[];
  directors?: StaffBase[];
  producers?: StaffBase[];
  staff?: StaffBase[];
  performers?: PerformerBase[];
  stuntPerformers?: PerformerBase[];
  standInPerformers?: PerformerBase[];
  characters?: CharacterBase[];
};

export type MovieBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  movies?: MovieBase[];
};

export type MovieFullResponse = {
  movie?: MovieFull;
};

export type OccupationHeader = {
  uid: string;
  name: string;
};

export type OccupationBase = {
  uid: string;
  name: string;
  legalOccupation?: boolean;
  medicalOccupation?: boolean;
  scientificOccupation?: boolean;
};

export type OccupationFull = {
  uid: string;
  name: string;
  legalOccupation?: boolean;
  medicalOccupation?: boolean;
  scientificOccupation?: boolean;
  characters?: CharacterBase[];
};

export type OccupationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  occupations?: OccupationBase[];
};

export type OccupationFullResponse = {
  occupation?: OccupationFull;
};

export type OrganizationHeader = {
  uid: string;
  name: string;
};

export type OrganizationBase = {
  uid: string;
  name: string;
  government?: boolean;
  intergovernmentalOrganization?: boolean;
  researchOrganization?: boolean;
  sportOrganization?: boolean;
  medicalOrganization?: boolean;
  militaryOrganization?: boolean;
  militaryUnit?: boolean;
  governmentAgency?: boolean;
  lawEnforcementAgency?: boolean;
  prisonOrPenalColony?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type OrganizationFull = {
  uid: string;
  name: string;
  government?: boolean;
  intergovernmentalOrganization?: boolean;
  researchOrganization?: boolean;
  sportOrganization?: boolean;
  medicalOrganization?: boolean;
  militaryOrganization?: boolean;
  militaryUnit?: boolean;
  governmentAgency?: boolean;
  lawEnforcementAgency?: boolean;
  prisonOrPenalColony?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
  characters?: CharacterBase[];
};

export type OrganizationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  organizations?: OrganizationBase[];
};

export type OrganizationFullResponse = {
  organization?: OrganizationFull;
};

export type PerformerHeader = {
  uid: string;
  name: string;
};

export type PerformerBase = {
  uid: string;
  name: string;
  birthName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  placeOfBirth?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  animalPerformer?: boolean;
  disPerformer?: boolean;
  ds9Performer?: boolean;
  entPerformer?: boolean;
  filmPerformer?: boolean;
  standInPerformer?: boolean;
  stuntPerformer?: boolean;
  tasPerformer?: boolean;
  tngPerformer?: boolean;
  tosPerformer?: boolean;
  videoGamePerformer?: boolean;
  voicePerformer?: boolean;
  voyPerformer?: boolean;
};

export type PerformerFull = {
  uid: string;
  name: string;
  birthName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  placeOfBirth?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  animalPerformer?: boolean;
  disPerformer?: boolean;
  ds9Performer?: boolean;
  entPerformer?: boolean;
  filmPerformer?: boolean;
  standInPerformer?: boolean;
  stuntPerformer?: boolean;
  tasPerformer?: boolean;
  tngPerformer?: boolean;
  tosPerformer?: boolean;
  videoGamePerformer?: boolean;
  voicePerformer?: boolean;
  voyPerformer?: boolean;
  episodesPerformances?: EpisodeBase[];
  episodesStuntPerformances?: EpisodeBase[];
  episodesStandInPerformances?: EpisodeBase[];
  moviesPerformances?: MovieBase[];
  moviesStuntPerformances?: MovieBase[];
  moviesStandInPerformances?: MovieBase[];
  characters?: CharacterBase[];
};

export type PerformerBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  performers?: PerformerBase[];
};

export type PerformerFullResponse = {
  performer?: PerformerFull;
};

export type Platform = {
  uid?: string;
  name?: string;
};

export type ProductionRunUnit = "BOX" | "SET";

export type Reference = {
  uid?: string;
  referenceType?: ReferenceType;
  referenceNumber?: string;
};

export type ReferenceType = "ASIN" | "ISBN";

export type ResponsePage = {
  pageNumber?: number;
  pageSize?: number;
  numberOfElements?: number;
  totalElements?: number;
  totalPages?: number;
  firstPage?: boolean;
  lastPage?: boolean;
};

export type ResponseSort = {
  clauses?: ResponseSortClause[];
};

export type ResponseSortClause = {
  name: string;
  direction?: ResponseSortDirection;
  clauseOrder: number;
};

export type ResponseSortDirection = "ASC" | "DESC";

export type SeasonHeader = {
  uid: string;
  title: string;
};

export type SeasonBase = {
  uid: string;
  title: string;
  series?: SeriesHeader;
  seasonNumber?: number;
  numberOfEpisodes?: number;
};

export type SeasonFull = {
  uid: string;
  title: string;
  series?: SeriesBase;
  seasonNumber?: number;
  numberOfEpisodes?: number;
  episodes?: EpisodeBase[];
};

export type SeasonBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  seasons?: SeasonBase[];
};

export type SeasonFullResponse = {
  season?: SeasonFull;
};

export type SeriesHeader = {
  uid: string;
  title: string;
};

export type SeriesBase = {
  uid: string;
  title: string;
  abbreviation: string;
  productionStartYear?: number;
  productionEndYear?: number;
  originalRunStartDate?: string;
  originalRunEndDate?: string;
  seasonsCount?: number;
  episodesCount?: number;
  featureLengthEpisodesCount?: number;
  productionCompany?: CompanyHeader;
  originalBroadcaster?: CompanyHeader;
};

export type SeriesFull = {
  uid: string;
  title: string;
  abbreviation: string;
  productionStartYear?: number;
  productionEndYear?: number;
  originalRunStartDate?: string;
  originalRunEndDate?: string;
  seasonsCount?: number;
  episodesCount?: number;
  featureLengthEpisodesCount?: number;
  productionCompany?: CompanyBase;
  originalBroadcaster?: CompanyBase;
  episodes?: EpisodeBase[];
  seasons?: SeasonBase[];
};

export type SeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  series?: SeriesBase[];
};

export type SeriesFullResponse = {
  series?: SeriesFull;
};

export type SoundtrackHeader = {
  uid: string;
  title: string;
};

export type SoundtrackBase = {
  uid: string;
  title: string;
  releaseDate?: string;
  length?: number;
};

export type SoundtrackFull = {
  uid: string;
  title: string;
  releaseDate?: string;
  length?: number;
  labels?: CompanyBase[];
  composers?: StaffBase[];
  contributors?: StaffBase[];
  orchestrators?: StaffBase[];
  references?: Reference[];
};

export type SoundtrackBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  soundtracks?: SoundtrackBase[];
};

export type SoundtrackFullResponse = {
  soundtrack?: SoundtrackFull;
};

export type SpacecraftHeader = {
  uid: string;
  name: string;
};

export type SpacecraftBase = {
  uid: string;
  name: string;
  registry?: string;
  status?: string;
  dateStatus?: string;
  spacecraftClass?: SpacecraftClassHeader;
  owner?: OrganizationHeader;
  operator?: OrganizationHeader;
};

export type SpacecraftFull = {
  uid: string;
  name: string;
  registry?: string;
  status?: string;
  dateStatus?: string;
  spacecraftClass?: SpacecraftClassBase;
  owner?: OrganizationBase;
  operator?: OrganizationBase;
  spacecraftTypes?: SpacecraftType[];
};

export type SpacecraftBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  spacecrafts?: SpacecraftBase[];
};

export type SpacecraftFullResponse = {
  spacecraft?: SpacecraftFull;
};

export type SpacecraftClassHeader = {
  uid: string;
  name: string;
};

export type SpacecraftClassBase = {
  uid: string;
  name: string;
  numberOfDecks?: number;
  warpCapable?: boolean;
  alternateReality?: boolean;
  activeFrom?: string;
  activeTo?: string;
  species?: SpeciesHeader;
  owner?: OrganizationHeader;
  operator?: OrganizationHeader;
  affiliation?: OrganizationHeader;
};

export type SpacecraftClassFull = {
  uid: string;
  name: string;
  numberOfDecks?: number;
  warpCapable?: boolean;
  alternateReality?: boolean;
  activeFrom?: string;
  activeTo?: string;
  species?: SpeciesHeader;
  owner?: OrganizationBase;
  operator?: OrganizationBase;
  affiliation?: OrganizationBase;
  spacecraftTypes?: SpacecraftType[];
  spacecrafts?: SpacecraftBase[];
};

export type SpacecraftClassBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  spacecraftClasses?: SpacecraftClassBase[];
};

export type SpacecraftClassFullResponse = {
  spacecraftClass?: SpacecraftClassFull;
};

export type SpacecraftType = {
  uid?: string;
  name?: string;
};

export type SpeciesHeader = {
  uid: string;
  name: string;
};

export type SpeciesBase = {
  uid: string;
  name: string;
  homeworld?: AstronomicalObjectHeader;
  quadrant?: AstronomicalObjectHeader;
  extinctSpecies?: boolean;
  warpCapableSpecies?: boolean;
  extraGalacticSpecies?: boolean;
  humanoidSpecies?: boolean;
  reptilianSpecies?: boolean;
  nonCorporealSpecies?: boolean;
  shapeshiftingSpecies?: boolean;
  spaceborneSpecies?: boolean;
  telepathicSpecies?: boolean;
  transDimensionalSpecies?: boolean;
  unnamedSpecies?: boolean;
  alternateReality?: boolean;
};

export type SpeciesFull = {
  uid: string;
  name: string;
  homeworld?: AstronomicalObjectBase;
  quadrant?: AstronomicalObjectBase;
  extinctSpecies?: boolean;
  warpCapableSpecies?: boolean;
  extraGalacticSpecies?: boolean;
  humanoidSpecies?: boolean;
  reptilianSpecies?: boolean;
  nonCorporealSpecies?: boolean;
  shapeshiftingSpecies?: boolean;
  spaceborneSpecies?: boolean;
  telepathicSpecies?: boolean;
  transDimensionalSpecies?: boolean;
  unnamedSpecies?: boolean;
  alternateReality?: boolean;
  characters?: CharacterBase[];
};

export type SpeciesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  species?: SpeciesBase[];
};

export type SpeciesFullResponse = {
  species?: SpeciesFull;
};

export type StaffHeader = {
  uid: string;
  name: string;
};

export type StaffBase = {
  uid: string;
  name: string;
  birthName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  placeOfBirth?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  artDepartment?: boolean;
  artDirector?: boolean;
  productionDesigner?: boolean;
  cameraAndElectricalDepartment?: boolean;
  cinematographer?: boolean;
  castingDepartment?: boolean;
  costumeDepartment?: boolean;
  costumeDesigner?: boolean;
  director?: boolean;
  assistantOrSecondUnitDirector?: boolean;
  exhibitAndAttractionStaff?: boolean;
  filmEditor?: boolean;
  linguist?: boolean;
  locationStaff?: boolean;
  makeupStaff?: boolean;
  musicDepartment?: boolean;
  composer?: boolean;
  personalAssistant?: boolean;
  producer?: boolean;
  productionAssociate?: boolean;
  productionStaff?: boolean;
  publicationStaff?: boolean;
  scienceConsultant?: boolean;
  soundDepartment?: boolean;
  specialAndVisualEffectsStaff?: boolean;
  author?: boolean;
  audioAuthor?: boolean;
  calendarArtist?: boolean;
  comicArtist?: boolean;
  comicAuthor?: boolean;
  comicColorArtist?: boolean;
  comicInteriorArtist?: boolean;
  comicInkArtist?: boolean;
  comicPencilArtist?: boolean;
  comicLetterArtist?: boolean;
  comicStripArtist?: boolean;
  gameArtist?: boolean;
  gameAuthor?: boolean;
  novelArtist?: boolean;
  novelAuthor?: boolean;
  referenceArtist?: boolean;
  referenceAuthor?: boolean;
  publicationArtist?: boolean;
  publicationDesigner?: boolean;
  publicationEditor?: boolean;
  publicityArtist?: boolean;
  cbsDigitalStaff?: boolean;
  ilmProductionStaff?: boolean;
  specialFeaturesStaff?: boolean;
  storyEditor?: boolean;
  studioExecutive?: boolean;
  stuntDepartment?: boolean;
  transportationDepartment?: boolean;
  videoGameProductionStaff?: boolean;
  writer?: boolean;
};

export type StaffFull = {
  uid: string;
  name: string;
  birthName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  placeOfBirth?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  artDepartment?: boolean;
  artDirector?: boolean;
  productionDesigner?: boolean;
  cameraAndElectricalDepartment?: boolean;
  cinematographer?: boolean;
  castingDepartment?: boolean;
  costumeDepartment?: boolean;
  costumeDesigner?: boolean;
  director?: boolean;
  assistantOrSecondUnitDirector?: boolean;
  exhibitAndAttractionStaff?: boolean;
  filmEditor?: boolean;
  linguist?: boolean;
  locationStaff?: boolean;
  makeupStaff?: boolean;
  musicDepartment?: boolean;
  composer?: boolean;
  personalAssistant?: boolean;
  producer?: boolean;
  productionAssociate?: boolean;
  productionStaff?: boolean;
  publicationStaff?: boolean;
  scienceConsultant?: boolean;
  soundDepartment?: boolean;
  specialAndVisualEffectsStaff?: boolean;
  author?: boolean;
  audioAuthor?: boolean;
  calendarArtist?: boolean;
  comicArtist?: boolean;
  comicAuthor?: boolean;
  comicColorArtist?: boolean;
  comicInteriorArtist?: boolean;
  comicInkArtist?: boolean;
  comicPencilArtist?: boolean;
  comicLetterArtist?: boolean;
  comicStripArtist?: boolean;
  gameArtist?: boolean;
  gameAuthor?: boolean;
  novelArtist?: boolean;
  novelAuthor?: boolean;
  referenceArtist?: boolean;
  referenceAuthor?: boolean;
  publicationArtist?: boolean;
  publicationDesigner?: boolean;
  publicationEditor?: boolean;
  publicityArtist?: boolean;
  cbsDigitalStaff?: boolean;
  ilmProductionStaff?: boolean;
  specialFeaturesStaff?: boolean;
  storyEditor?: boolean;
  studioExecutive?: boolean;
  stuntDepartment?: boolean;
  transportationDepartment?: boolean;
  videoGameProductionStaff?: boolean;
  writer?: boolean;
  writtenEpisodes?: EpisodeBase[];
  teleplayAuthoredEpisodes?: EpisodeBase[];
  storyAuthoredEpisodes?: EpisodeBase[];
  directedEpisodes?: EpisodeBase[];
  episodes?: EpisodeBase[];
  writtenMovies?: MovieBase[];
  screenplayAuthoredMovies?: MovieBase[];
  storyAuthoredMovies?: MovieBase[];
  directedMovies?: MovieBase[];
  producedMovies?: MovieBase[];
  movies?: MovieBase[];
};

export type StaffBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  staff?: StaffBase[];
};

export type StaffFullResponse = {
  staff?: StaffFull;
};

export type TechnologyHeader = {
  uid: string;
  name: string;
};

export type TechnologyBase = {
  uid: string;
  name: string;
  borgTechnology?: boolean;
  borgComponent?: boolean;
  communicationsTechnology?: boolean;
  computerTechnology?: boolean;
  computerProgramming?: boolean;
  subroutine?: boolean;
  database?: boolean;
  energyTechnology?: boolean;
  fictionalTechnology?: boolean;
  holographicTechnology?: boolean;
  identificationTechnology?: boolean;
  lifeSupportTechnology?: boolean;
  sensorTechnology?: boolean;
  shieldTechnology?: boolean;
  tool?: boolean;
  culinaryTool?: boolean;
  engineeringTool?: boolean;
  householdTool?: boolean;
  medicalEquipment?: boolean;
  transporterTechnology?: boolean;
};

export type TechnologyFull = {
  uid: string;
  name: string;
  borgTechnology?: boolean;
  borgComponent?: boolean;
  communicationsTechnology?: boolean;
  computerTechnology?: boolean;
  computerProgramming?: boolean;
  subroutine?: boolean;
  database?: boolean;
  energyTechnology?: boolean;
  fictionalTechnology?: boolean;
  holographicTechnology?: boolean;
  identificationTechnology?: boolean;
  lifeSupportTechnology?: boolean;
  sensorTechnology?: boolean;
  shieldTechnology?: boolean;
  tool?: boolean;
  culinaryTool?: boolean;
  engineeringTool?: boolean;
  householdTool?: boolean;
  medicalEquipment?: boolean;
  transporterTechnology?: boolean;
};

export type TechnologyBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  technology?: TechnologyBase[];
};

export type TechnologyFullResponse = {
  technology?: TechnologyFull;
};

export type TitleHeader = {
  uid: string;
  name: string;
};

export type TitleBase = {
  uid: string;
  name: string;
  militaryRank?: boolean;
  fleetRank?: boolean;
  religiousTitle?: boolean;
  position?: boolean;
  mirror?: boolean;
};

export type TitleFull = {
  uid: string;
  name: string;
  militaryRank?: boolean;
  fleetRank?: boolean;
  religiousTitle?: boolean;
  position?: boolean;
  mirror?: boolean;
  characters?: CharacterBase[];
};

export type TitleBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  titles?: TitleBase[];
};

export type TitleFullResponse = {
  title?: TitleFull;
};

export type TradingCardHeader = {
  uid: string;
  name: string;
};

export type TradingCardBase = {
  uid: string;
  name: string;
  numberObject?: string;
  releaseYear?: number;
  productionRun?: number;
  tradingCardSet?: TradingCardSetHeader;
  tradingCardDeck?: TradingCardDeckHeader;
};

export type TradingCardFull = {
  uid: string;
  name: string;
  tradingCardSet?: TradingCardSetBase;
  tradingCardDeck?: TradingCardDeckBase;
  numberObject?: string;
  releaseYear?: number;
  productionRun?: number;
};

export type TradingCardBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  tradingCards?: TradingCardBase[];
};

export type TradingCardFullResponse = {
  tradingCard?: TradingCardFull;
};

export type TradingCardDeckHeader = {
  uid: string;
  name: string;
};

export type TradingCardDeckBase = {
  uid: string;
  name: string;
  frequency?: string;
  tradingCardSet?: TradingCardSetHeader;
};

export type TradingCardDeckFull = {
  uid: string;
  name: string;
  frequency?: string;
  tradingCardSet?: TradingCardSetHeader;
  tradingCards?: TradingCardBase[];
};

export type TradingCardDeckBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  tradingCardDecks?: TradingCardDeckBase[];
};

export type TradingCardDeckFullResponse = {
  tradingCardDeck?: TradingCardDeckFull;
};

export type TradingCardSetHeader = {
  uid: string;
  name: string;
};

export type TradingCardSetBase = {
  uid: string;
  name: string;
  releaseYear?: number;
  releaseMonth?: number;
  releaseDay?: number;
  cardsPerPack?: number;
  packsPerBox?: number;
  boxesPerCase?: number;
  productionRun?: number;
  productionRunUnit?: ProductionRunUnit;
  cardWidth?: number;
  cardHeight?: number;
};

export type TradingCardSetFull = {
  uid: string;
  name: string;
  releaseYear?: number;
  releaseMonth?: number;
  releaseDay?: number;
  cardsPerPack?: number;
  packsPerBox?: number;
  boxesPerCase?: number;
  productionRun?: number;
  productionRunUnit?: ProductionRunUnit;
  cardWidth?: number;
  cardHeight?: number;
  manufacturers?: CompanyBase[];
  tradingCardDecks?: TradingCardDeckBase[];
  tradingCards?: TradingCardBase[];
  countriesOfOrigin?: Country[];
};

export type TradingCardSetBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  tradingCardSets?: TradingCardSetBase[];
};

export type TradingCardSetFullResponse = {
  tradingCardSet?: TradingCardSetFull;
};

export type VideoGameHeader = {
  uid: string;
  title: string;
};

export type VideoGameBase = {
  uid: string;
  title: string;
  releaseDate?: string;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  systemRequirements?: string;
};

export type VideoGameFull = {
  uid: string;
  title: string;
  releaseDate?: string;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  systemRequirements?: string;
  publishers?: CompanyBase[];
  developers?: CompanyBase[];
  platforms?: Platform[];
  genres?: Genre[];
  ratings?: ContentRating[];
  references?: Reference[];
};

export type VideoGameBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  videoGames?: VideoGameBase[];
};

export type VideoGameFullResponse = {
  videoGame?: VideoGameFull;
};

export type VideoReleaseHeader = {
  uid: string;
  title: string;
};

export type VideoReleaseBase = {
  uid: string;
  title: string;
  series?: SeriesHeader;
  season?: SeasonHeader;
  format?: VideoReleaseFormat;
  numberOfEpisodes?: number;
  numberOfFeatureLengthEpisodes?: number;
  numberOfDataCarriers?: number;
  runTime?: number;
  yearFrom?: number;
  yearTo?: number;
  regionFreeReleaseDate?: string;
  region1AReleaseDate?: string;
  region1SlimlineReleaseDate?: string;
  region2BReleaseDate?: string;
  region2SlimlineReleaseDate?: string;
  region4AReleaseDate?: string;
  region4SlimlineReleaseDate?: string;
  amazonDigitalRelease?: boolean;
  dailymotionDigitalRelease?: boolean;
  googlePlayDigitalRelease?: boolean;
  iTunesDigitalRelease?: boolean;
  ultraVioletDigitalRelease?: boolean;
  vimeoDigitalRelease?: boolean;
  vuduDigitalRelease?: boolean;
  xboxSmartGlassDigitalRelease?: boolean;
  youTubeDigitalRelease?: boolean;
  netflixDigitalRelease?: boolean;
};

export type VideoReleaseFormat =
  | "SUPER_8"
  | "BETAMAX"
  | "VHS"
  | "CED"
  | "LD"
  | "VHD"
  | "VCD"
  | "VIDEO_8"
  | "DVD"
  | "UMD"
  | "HD_DVD"
  | "BLU_RAY"
  | "BLU_RAY_4K_UHD"
  | "DIGITAL_FORMAT";

export type VideoReleaseFull = {
  uid: string;
  title: string;
  series?: SeriesBase;
  season?: SeasonBase;
  format?: VideoReleaseFormat;
  numberOfEpisodes?: number;
  numberOfFeatureLengthEpisodes?: number;
  numberOfDataCarriers?: number;
  runTime?: number;
  yearFrom?: number;
  yearTo?: number;
  regionFreeReleaseDate?: string;
  region1AReleaseDate?: string;
  region1SlimlineReleaseDate?: string;
  region2BReleaseDate?: string;
  region2SlimlineReleaseDate?: string;
  region4AReleaseDate?: string;
  region4SlimlineReleaseDate?: string;
  amazonDigitalRelease?: boolean;
  dailymotionDigitalRelease?: boolean;
  googlePlayDigitalRelease?: boolean;
  iTunesDigitalRelease?: boolean;
  ultraVioletDigitalRelease?: boolean;
  vimeoDigitalRelease?: boolean;
  vuduDigitalRelease?: boolean;
  xboxSmartGlassDigitalRelease?: boolean;
  youTubeDigitalRelease?: boolean;
  netflixDigitalRelease?: boolean;
  references?: Reference[];
  ratings?: ContentRating[];
  languages?: ContentLanguage[];
  languagesSubtitles?: ContentLanguage[];
  languagesDubbed?: ContentLanguage[];
};

export type VideoReleaseBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  videoReleases?: VideoReleaseBase[];
};

export type VideoReleaseFullResponse = {
  videoRelease?: VideoReleaseFull;
};

export type WeaponHeader = {
  uid: string;
  name: string;
};

export type WeaponBase = {
  uid: string;
  name: string;
  handHeldWeapon?: boolean;
  laserTechnology?: boolean;
  plasmaTechnology?: boolean;
  photonicTechnology?: boolean;
  phaserTechnology?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type WeaponFull = {
  uid: string;
  name: string;
  handHeldWeapon?: boolean;
  laserTechnology?: boolean;
  plasmaTechnology?: boolean;
  photonicTechnology?: boolean;
  phaserTechnology?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
};

export type WeaponBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  weapons?: WeaponBase[];
};

export type WeaponFullResponse = {
  weapon?: WeaponFull;
};

animalUsingGET.displayName = "animalUsingGET";
export async function animalUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/animal?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as AnimalFullResponse);
}

animalSearchUsingGET.displayName = "animalSearchUsingGET";
export async function animalSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/animal/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as AnimalBaseResponse);
}

animalSearchUsingPOST.displayName = "animalSearchUsingPOST";
export async function animalSearchUsingPOST(
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
  {
    name,
    earthAnimal,
    earthInsect,
    avian,
    canine,
    feline,
  }: {
    name: string;
    earthAnimal: boolean;
    earthInsect: boolean;
    avian: boolean;
    canine: boolean;
    feline: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("earthAnimal", String(earthAnimal));
  fd.append("earthInsect", String(earthInsect));
  fd.append("avian", String(avian));
  fd.append("canine", String(canine));
  fd.append("feline", String(feline));
  return fetch(
    `/animal/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as AnimalBaseResponse);
}

astronomicalObjectUsingGET.displayName = "astronomicalObjectUsingGET";
export async function astronomicalObjectUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/astronomicalObject?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as AstronomicalObjectFullResponse);
}

astronomicalObjectSearchUsingGET.displayName =
  "astronomicalObjectSearchUsingGET";
export async function astronomicalObjectSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/astronomicalObject/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as AstronomicalObjectBaseResponse);
}

astronomicalObjectSearchUsingPOST.displayName =
  "astronomicalObjectSearchUsingPOST";
export async function astronomicalObjectSearchUsingPOST(
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
  {
    name,
    astronomicalObjectType,
    locationUid,
  }: {
    name: string;
    astronomicalObjectType: string;
    locationUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("astronomicalObjectType", String(astronomicalObjectType));
  fd.append("locationUid", String(locationUid));
  return fetch(
    `/astronomicalObject/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as AstronomicalObjectBaseResponse);
}

bookUsingGET.displayName = "bookUsingGET";
export async function bookUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/book?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookFullResponse);
}

bookSearchUsingGET.displayName = "bookSearchUsingGET";
export async function bookSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/book/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookBaseResponse);
}

bookSearchUsingPOST.displayName = "bookSearchUsingPOST";
export async function bookSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    novel,
    referenceBook,
    biographyBook,
    rolePlayingBook,
    eBook,
    anthology,
    novelization,
    audiobook,
    audiobookAbridged,
    audiobookPublishedYearFrom,
    audiobookPublishedYearTo,
    audiobookRunTimeFrom,
    audiobookRunTimeTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("novel", String(novel));
  fd.append("referenceBook", String(referenceBook));
  fd.append("biographyBook", String(biographyBook));
  fd.append("rolePlayingBook", String(rolePlayingBook));
  fd.append("eBook", String(eBook));
  fd.append("anthology", String(anthology));
  fd.append("novelization", String(novelization));
  fd.append("audiobook", String(audiobook));
  fd.append("audiobookAbridged", String(audiobookAbridged));
  fd.append("audiobookPublishedYearFrom", String(audiobookPublishedYearFrom));
  fd.append("audiobookPublishedYearTo", String(audiobookPublishedYearTo));
  fd.append("audiobookRunTimeFrom", String(audiobookRunTimeFrom));
  fd.append("audiobookRunTimeTo", String(audiobookRunTimeTo));
  return fetch(
    `/book/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as BookBaseResponse);
}

bookCollectionUsingGET.displayName = "bookCollectionUsingGET";
export async function bookCollectionUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/bookCollection?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookCollectionFullResponse);
}

bookCollectionSearchUsingGET.displayName = "bookCollectionSearchUsingGET";
export async function bookCollectionSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/bookCollection/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookCollectionBaseResponse);
}

bookCollectionSearchUsingPOST.displayName = "bookCollectionSearchUsingPOST";
export async function bookCollectionSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  return fetch(
    `/bookCollection/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as BookCollectionBaseResponse);
}

bookSeriesUsingGET.displayName = "bookSeriesUsingGET";
export async function bookSeriesUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/bookSeries?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookSeriesFullResponse);
}

bookSeriesSearchUsingGET.displayName = "bookSeriesSearchUsingGET";
export async function bookSeriesSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/bookSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as BookSeriesBaseResponse);
}

bookSeriesSearchUsingPOST.displayName = "bookSeriesSearchUsingPOST";
export async function bookSeriesSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfBooksFrom,
    numberOfBooksTo,
    yearFrom,
    yearTo,
    miniseries,
    eBookSeries,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfBooksFrom", String(numberOfBooksFrom));
  fd.append("numberOfBooksTo", String(numberOfBooksTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("miniseries", String(miniseries));
  fd.append("eBookSeries", String(eBookSeries));
  return fetch(
    `/bookSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as BookSeriesBaseResponse);
}

characterUsingGET.displayName = "characterUsingGET";
export async function characterUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/character?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as CharacterFullResponse);
}

characterSearchUsingGET.displayName = "characterSearchUsingGET";
export async function characterSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/character/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as CharacterBaseResponse);
}

characterSearchUsingPOST.displayName = "characterSearchUsingPOST";
export async function characterSearchUsingPOST(
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
  {
    name,
    gender,
    deceased,
    hologram,
    fictionalCharacter,
    mirror,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("gender", String(gender));
  fd.append("deceased", String(deceased));
  fd.append("hologram", String(hologram));
  fd.append("fictionalCharacter", String(fictionalCharacter));
  fd.append("mirror", String(mirror));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/character/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as CharacterBaseResponse);
}

comicsUsingGET.displayName = "comicsUsingGET";
export async function comicsUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/comics?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicsFullResponse);
}

comicsSearchUsingGET.displayName = "comicsSearchUsingGET";
export async function comicsSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/comics/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicsBaseResponse);
}

comicsSearchUsingPOST.displayName = "comicsSearchUsingPOST";
export async function comicsSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    photonovel,
    adaptation,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("photonovel", String(photonovel));
  fd.append("adaptation", String(adaptation));
  return fetch(
    `/comics/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ComicsBaseResponse);
}

comicCollectionUsingGET.displayName = "comicCollectionUsingGET";
export async function comicCollectionUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/comicCollection?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicCollectionFullResponse);
}

comicCollectionSearchUsingGET.displayName = "comicCollectionSearchUsingGET";
export async function comicCollectionSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/comicCollection/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicCollectionBaseResponse);
}

comicCollectionSearchUsingPOST.displayName = "comicCollectionSearchUsingPOST";
export async function comicCollectionSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    photonovel,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("photonovel", String(photonovel));
  return fetch(
    `/comicCollection/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ComicCollectionBaseResponse);
}

comicSeriesUsingGET.displayName = "comicSeriesUsingGET";
export async function comicSeriesUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/comicSeries?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicSeriesFullResponse);
}

comicSeriesSearchUsingGET.displayName = "comicSeriesSearchUsingGET";
export async function comicSeriesSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/comicSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicSeriesBaseResponse);
}

comicSeriesSearchUsingPOST.displayName = "comicSeriesSearchUsingPOST";
export async function comicSeriesSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfIssuesFrom,
    numberOfIssuesTo,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    miniseries,
    photonovelSeries,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfIssuesFrom", String(numberOfIssuesFrom));
  fd.append("numberOfIssuesTo", String(numberOfIssuesTo));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("miniseries", String(miniseries));
  fd.append("photonovelSeries", String(photonovelSeries));
  return fetch(
    `/comicSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ComicSeriesBaseResponse);
}

comicStripUsingGET.displayName = "comicStripUsingGET";
export async function comicStripUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/comicStrip?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicStripFullResponse);
}

comicStripSearchUsingGET.displayName = "comicStripSearchUsingGET";
export async function comicStripSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/comicStrip/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ComicStripBaseResponse);
}

comicStripSearchUsingPOST.displayName = "comicStripSearchUsingPOST";
export async function comicStripSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
    yearFrom,
    yearTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  return fetch(
    `/comicStrip/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ComicStripBaseResponse);
}

companyUsingGET.displayName = "companyUsingGET";
export async function companyUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/company?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as CompanyFullResponse);
}

companySearchUsingGET.displayName = "companySearchUsingGET";
export async function companySearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/company/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as CompanyBaseResponse);
}

companySearchUsingPOST.displayName = "companySearchUsingPOST";
export async function companySearchUsingPOST(
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
  {
    name,
    broadcaster,
    collectibleCompany,
    conglomerate,
    digitalVisualEffectsCompany,
    distributor,
    gameCompany,
    filmEquipmentCompany,
    makeUpEffectsStudio,
    mattePaintingCompany,
    modelAndMiniatureEffectsCompany,
    postProductionCompany,
    productionCompany,
    propCompany,
    recordLabel,
    specialEffectsCompany,
    tvAndFilmProductionCompany,
    videoGameCompany,
  }: {
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
  fd.append("name", String(name));
  fd.append("broadcaster", String(broadcaster));
  fd.append("collectibleCompany", String(collectibleCompany));
  fd.append("conglomerate", String(conglomerate));
  fd.append("digitalVisualEffectsCompany", String(digitalVisualEffectsCompany));
  fd.append("distributor", String(distributor));
  fd.append("gameCompany", String(gameCompany));
  fd.append("filmEquipmentCompany", String(filmEquipmentCompany));
  fd.append("makeUpEffectsStudio", String(makeUpEffectsStudio));
  fd.append("mattePaintingCompany", String(mattePaintingCompany));
  fd.append(
    "modelAndMiniatureEffectsCompany",
    String(modelAndMiniatureEffectsCompany),
  );
  fd.append("postProductionCompany", String(postProductionCompany));
  fd.append("productionCompany", String(productionCompany));
  fd.append("propCompany", String(propCompany));
  fd.append("recordLabel", String(recordLabel));
  fd.append("specialEffectsCompany", String(specialEffectsCompany));
  fd.append("tvAndFilmProductionCompany", String(tvAndFilmProductionCompany));
  fd.append("videoGameCompany", String(videoGameCompany));
  return fetch(
    `/company/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as CompanyBaseResponse);
}

conflictUsingGET.displayName = "conflictUsingGET";
export async function conflictUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/conflict?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ConflictFullResponse);
}

conflictSearchUsingGET.displayName = "conflictSearchUsingGET";
export async function conflictSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/conflict/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ConflictBaseResponse);
}

conflictSearchUsingPOST.displayName = "conflictSearchUsingPOST";
export async function conflictSearchUsingPOST(
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
  {
    name,
    yearFrom,
    yearTo,
    earthConflict,
    federationWar,
    klingonWar,
    dominionWarBattle,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("earthConflict", String(earthConflict));
  fd.append("federationWar", String(federationWar));
  fd.append("klingonWar", String(klingonWar));
  fd.append("dominionWarBattle", String(dominionWarBattle));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/conflict/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ConflictBaseResponse);
}

elementUsingGET.displayName = "elementUsingGET";
export async function elementUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/element?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ElementFullResponse);
}

elementSearchUsingGET.displayName = "elementSearchUsingGET";
export async function elementSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/element/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as ElementBaseResponse);
}

elementSearchUsingPOST.displayName = "elementSearchUsingPOST";
export async function elementSearchUsingPOST(
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
  {
    name,
    symbolObject,
    transuranium,
    gammaSeries,
    hypersonicSeries,
    megaSeries,
    omegaSeries,
    transonicSeries,
    worldSeries,
  }: {
    name: string;
    symbolObject: string;
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
  fd.append("name", String(name));
  fd.append("symbol", String(symbolObject));
  fd.append("transuranium", String(transuranium));
  fd.append("gammaSeries", String(gammaSeries));
  fd.append("hypersonicSeries", String(hypersonicSeries));
  fd.append("megaSeries", String(megaSeries));
  fd.append("omegaSeries", String(omegaSeries));
  fd.append("transonicSeries", String(transonicSeries));
  fd.append("worldSeries", String(worldSeries));
  return fetch(
    `/element/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as ElementBaseResponse);
}

episodeUsingGET.displayName = "episodeUsingGET";
export async function episodeUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/episode?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as EpisodeFullResponse);
}

episodeSearchUsingGET.displayName = "episodeSearchUsingGET";
export async function episodeSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/episode/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as EpisodeBaseResponse);
}

episodeSearchUsingPOST.displayName = "episodeSearchUsingPOST";
export async function episodeSearchUsingPOST(
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
  {
    title,
    seasonNumberFrom,
    seasonNumberTo,
    episodeNumberFrom,
    episodeNumberTo,
    productionSerialNumber,
    featureLength,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    usAirDateFrom,
    usAirDateTo,
    finalScriptDateFrom,
    finalScriptDateTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("seasonNumberFrom", String(seasonNumberFrom));
  fd.append("seasonNumberTo", String(seasonNumberTo));
  fd.append("episodeNumberFrom", String(episodeNumberFrom));
  fd.append("episodeNumberTo", String(episodeNumberTo));
  fd.append("productionSerialNumber", String(productionSerialNumber));
  fd.append("featureLength", String(featureLength));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("usAirDateFrom", String(usAirDateFrom));
  fd.append("usAirDateTo", String(usAirDateTo));
  fd.append("finalScriptDateFrom", String(finalScriptDateFrom));
  fd.append("finalScriptDateTo", String(finalScriptDateTo));
  return fetch(
    `/episode/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as EpisodeBaseResponse);
}

foodUsingGET.displayName = "foodUsingGET";
export async function foodUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/food?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as FoodFullResponse);
}

foodSearchUsingGET.displayName = "foodSearchUsingGET";
export async function foodSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/food/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as FoodBaseResponse);
}

foodSearchUsingPOST.displayName = "foodSearchUsingPOST";
export async function foodSearchUsingPOST(
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
  {
    name,
    earthlyOrigin,
    dessert,
    fruit,
    herbOrSpice,
    sauce,
    soup,
    beverage,
    alcoholicBeverage,
    juice,
    tea,
  }: {
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
  fd.append("name", String(name));
  fd.append("earthlyOrigin", String(earthlyOrigin));
  fd.append("dessert", String(dessert));
  fd.append("fruit", String(fruit));
  fd.append("herbOrSpice", String(herbOrSpice));
  fd.append("sauce", String(sauce));
  fd.append("soup", String(soup));
  fd.append("beverage", String(beverage));
  fd.append("alcoholicBeverage", String(alcoholicBeverage));
  fd.append("juice", String(juice));
  fd.append("tea", String(tea));
  return fetch(
    `/food/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as FoodBaseResponse);
}

literatureUsingGET.displayName = "literatureUsingGET";
export async function literatureUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/literature?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as LiteratureFullResponse);
}

literatureSearchUsingGET.displayName = "literatureSearchUsingGET";
export async function literatureSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/literature/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as LiteratureBaseResponse);
}

literatureSearchUsingPOST.displayName = "literatureSearchUsingPOST";
export async function literatureSearchUsingPOST(
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
  {
    title,
    earthlyOrigin,
    shakespeareanWork,
    report,
    scientificLiterature,
    technicalManual,
    religiousLiterature,
  }: {
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
  fd.append("title", String(title));
  fd.append("earthlyOrigin", String(earthlyOrigin));
  fd.append("shakespeareanWork", String(shakespeareanWork));
  fd.append("report", String(report));
  fd.append("scientificLiterature", String(scientificLiterature));
  fd.append("technicalManual", String(technicalManual));
  fd.append("religiousLiterature", String(religiousLiterature));
  return fetch(
    `/literature/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as LiteratureBaseResponse);
}

locationUsingGET.displayName = "locationUsingGET";
export async function locationUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/location?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as LocationFullResponse);
}

locationSearchUsingGET.displayName = "locationSearchUsingGET";
export async function locationSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/location/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as LocationBaseResponse);
}

locationSearchUsingPOST.displayName = "locationSearchUsingPOST";
export async function locationSearchUsingPOST(
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
  {
    name,
    earthlyLocation,
    fictionalLocation,
    religiousLocation,
    geographicalLocation,
    bodyOfWater,
    country,
    subnationalEntity,
    settlement,
    usSettlement,
    bajoranSettlement,
    colony,
    landform,
    landmark,
    road,
    structure,
    shipyard,
    buildingInterior,
    establishment,
    medicalEstablishment,
    ds9Establishment,
    school,
    mirror,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("earthlyLocation", String(earthlyLocation));
  fd.append("fictionalLocation", String(fictionalLocation));
  fd.append("religiousLocation", String(religiousLocation));
  fd.append("geographicalLocation", String(geographicalLocation));
  fd.append("bodyOfWater", String(bodyOfWater));
  fd.append("country", String(country));
  fd.append("subnationalEntity", String(subnationalEntity));
  fd.append("settlement", String(settlement));
  fd.append("usSettlement", String(usSettlement));
  fd.append("bajoranSettlement", String(bajoranSettlement));
  fd.append("colony", String(colony));
  fd.append("landform", String(landform));
  fd.append("landmark", String(landmark));
  fd.append("road", String(road));
  fd.append("structure", String(structure));
  fd.append("shipyard", String(shipyard));
  fd.append("buildingInterior", String(buildingInterior));
  fd.append("establishment", String(establishment));
  fd.append("medicalEstablishment", String(medicalEstablishment));
  fd.append("ds9Establishment", String(ds9Establishment));
  fd.append("school", String(school));
  fd.append("mirror", String(mirror));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/location/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as LocationBaseResponse);
}

magazineUsingGET.displayName = "magazineUsingGET";
export async function magazineUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/magazine?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MagazineFullResponse);
}

magazineSearchUsingGET.displayName = "magazineSearchUsingGET";
export async function magazineSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/magazine/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MagazineBaseResponse);
}

magazineSearchUsingPOST.displayName = "magazineSearchUsingPOST";
export async function magazineSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfPagesFrom,
    numberOfPagesTo,
  }: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfPagesFrom: number;
    numberOfPagesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfPagesFrom", String(numberOfPagesFrom));
  fd.append("numberOfPagesTo", String(numberOfPagesTo));
  return fetch(
    `/magazine/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as MagazineBaseResponse);
}

magazineSeriesUsingGET.displayName = "magazineSeriesUsingGET";
export async function magazineSeriesUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/magazineSeries?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MagazineSeriesFullResponse);
}

magazineSeriesSearchUsingGET.displayName = "magazineSeriesSearchUsingGET";
export async function magazineSeriesSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/magazineSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MagazineSeriesBaseResponse);
}

magazineSeriesSearchUsingPOST.displayName = "magazineSeriesSearchUsingPOST";
export async function magazineSeriesSearchUsingPOST(
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
  {
    title,
    publishedYearFrom,
    publishedYearTo,
    numberOfIssuesFrom,
    numberOfIssuesTo,
  }: {
    title: string;
    publishedYearFrom: number;
    publishedYearTo: number;
    numberOfIssuesFrom: number;
    numberOfIssuesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("publishedYearFrom", String(publishedYearFrom));
  fd.append("publishedYearTo", String(publishedYearTo));
  fd.append("numberOfIssuesFrom", String(numberOfIssuesFrom));
  fd.append("numberOfIssuesTo", String(numberOfIssuesTo));
  return fetch(
    `/magazineSeries/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as MagazineSeriesBaseResponse);
}

materialUsingGET.displayName = "materialUsingGET";
export async function materialUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/material?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MaterialFullResponse);
}

materialSearchUsingGET.displayName = "materialSearchUsingGET";
export async function materialSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/material/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MaterialBaseResponse);
}

materialSearchUsingPOST.displayName = "materialSearchUsingPOST";
export async function materialSearchUsingPOST(
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
  {
    name,
    chemicalCompound,
    biochemicalCompound,
    drug,
    poisonousSubstance,
    explosive,
    gemstone,
    alloyOrComposite,
    fuel,
    mineral,
    preciousMaterial,
  }: {
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
  fd.append("name", String(name));
  fd.append("chemicalCompound", String(chemicalCompound));
  fd.append("biochemicalCompound", String(biochemicalCompound));
  fd.append("drug", String(drug));
  fd.append("poisonousSubstance", String(poisonousSubstance));
  fd.append("explosive", String(explosive));
  fd.append("gemstone", String(gemstone));
  fd.append("alloyOrComposite", String(alloyOrComposite));
  fd.append("fuel", String(fuel));
  fd.append("mineral", String(mineral));
  fd.append("preciousMaterial", String(preciousMaterial));
  return fetch(
    `/material/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as MaterialBaseResponse);
}

medicalConditionUsingGET.displayName = "medicalConditionUsingGET";
export async function medicalConditionUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/medicalCondition?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MedicalConditionFullResponse);
}

medicalConditionSearchUsingGET.displayName = "medicalConditionSearchUsingGET";
export async function medicalConditionSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/medicalCondition/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MedicalConditionBaseResponse);
}

medicalConditionSearchUsingPOST.displayName = "medicalConditionSearchUsingPOST";
export async function medicalConditionSearchUsingPOST(
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
  {
    name,
    psychologicalCondition,
  }: {
    name: string;
    psychologicalCondition: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("psychologicalCondition", String(psychologicalCondition));
  return fetch(
    `/medicalCondition/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as MedicalConditionBaseResponse);
}

movieUsingGET.displayName = "movieUsingGET";
export async function movieUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/movie?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MovieFullResponse);
}

movieSearchUsingGET.displayName = "movieSearchUsingGET";
export async function movieSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/movie/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as MovieBaseResponse);
}

movieSearchUsingPOST.displayName = "movieSearchUsingPOST";
export async function movieSearchUsingPOST(
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
  {
    title,
    stardateFrom,
    stardateTo,
    yearFrom,
    yearTo,
    usReleaseDateFrom,
    usReleaseDateTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("stardateFrom", String(stardateFrom));
  fd.append("stardateTo", String(stardateTo));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("usReleaseDateFrom", String(usReleaseDateFrom));
  fd.append("usReleaseDateTo", String(usReleaseDateTo));
  return fetch(
    `/movie/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as MovieBaseResponse);
}

occupationUsingGET.displayName = "occupationUsingGET";
export async function occupationUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/occupation?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as OccupationFullResponse);
}

occupationSearchUsingGET.displayName = "occupationSearchUsingGET";
export async function occupationSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/occupation/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as OccupationBaseResponse);
}

occupationSearchUsingPOST.displayName = "occupationSearchUsingPOST";
export async function occupationSearchUsingPOST(
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
  {
    name,
    legalOccupation,
    medicalOccupation,
    scientificOccupation,
  }: {
    name: string;
    legalOccupation: boolean;
    medicalOccupation: boolean;
    scientificOccupation: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("legalOccupation", String(legalOccupation));
  fd.append("medicalOccupation", String(medicalOccupation));
  fd.append("scientificOccupation", String(scientificOccupation));
  return fetch(
    `/occupation/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as OccupationBaseResponse);
}

organizationUsingGET.displayName = "organizationUsingGET";
export async function organizationUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/organization?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as OrganizationFullResponse);
}

organizationSearchUsingGET.displayName = "organizationSearchUsingGET";
export async function organizationSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/organization/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as OrganizationBaseResponse);
}

organizationSearchUsingPOST.displayName = "organizationSearchUsingPOST";
export async function organizationSearchUsingPOST(
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
  {
    name,
    government,
    intergovernmentalOrganization,
    researchOrganization,
    sportOrganization,
    medicalOrganization,
    militaryOrganization,
    militaryUnit,
    governmentAgency,
    lawEnforcementAgency,
    prisonOrPenalColony,
    mirror,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("government", String(government));
  fd.append(
    "intergovernmentalOrganization",
    String(intergovernmentalOrganization),
  );
  fd.append("researchOrganization", String(researchOrganization));
  fd.append("sportOrganization", String(sportOrganization));
  fd.append("medicalOrganization", String(medicalOrganization));
  fd.append("militaryOrganization", String(militaryOrganization));
  fd.append("militaryUnit", String(militaryUnit));
  fd.append("governmentAgency", String(governmentAgency));
  fd.append("lawEnforcementAgency", String(lawEnforcementAgency));
  fd.append("prisonOrPenalColony", String(prisonOrPenalColony));
  fd.append("mirror", String(mirror));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/organization/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as OrganizationBaseResponse);
}

performerUsingGET.displayName = "performerUsingGET";
export async function performerUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/performer?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as PerformerFullResponse);
}

performerSearchUsingGET.displayName = "performerSearchUsingGET";
export async function performerSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/performer/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as PerformerBaseResponse);
}

performerSearchUsingPOST.displayName = "performerSearchUsingPOST";
export async function performerSearchUsingPOST(
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
  {
    name,
    birthName,
    gender,
    dateOfBirthFrom,
    dateOfBirthTo,
    placeOfBirth,
    dateOfDeathFrom,
    dateOfDeathTo,
    placeOfDeath,
    animalPerformer,
    disPerformer,
    ds9Performer,
    entPerformer,
    filmPerformer,
    standInPerformer,
    stuntPerformer,
    tasPerformer,
    tngPerformer,
    tosPerformer,
    videoGamePerformer,
    voicePerformer,
    voyPerformer,
  }: {
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
  fd.append("name", String(name));
  fd.append("birthName", String(birthName));
  fd.append("gender", String(gender));
  fd.append("dateOfBirthFrom", String(dateOfBirthFrom));
  fd.append("dateOfBirthTo", String(dateOfBirthTo));
  fd.append("placeOfBirth", String(placeOfBirth));
  fd.append("dateOfDeathFrom", String(dateOfDeathFrom));
  fd.append("dateOfDeathTo", String(dateOfDeathTo));
  fd.append("placeOfDeath", String(placeOfDeath));
  fd.append("animalPerformer", String(animalPerformer));
  fd.append("disPerformer", String(disPerformer));
  fd.append("ds9Performer", String(ds9Performer));
  fd.append("entPerformer", String(entPerformer));
  fd.append("filmPerformer", String(filmPerformer));
  fd.append("standInPerformer", String(standInPerformer));
  fd.append("stuntPerformer", String(stuntPerformer));
  fd.append("tasPerformer", String(tasPerformer));
  fd.append("tngPerformer", String(tngPerformer));
  fd.append("tosPerformer", String(tosPerformer));
  fd.append("videoGamePerformer", String(videoGamePerformer));
  fd.append("voicePerformer", String(voicePerformer));
  fd.append("voyPerformer", String(voyPerformer));
  return fetch(
    `/performer/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as PerformerBaseResponse);
}

seasonUsingGET.displayName = "seasonUsingGET";
export async function seasonUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/season?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SeasonFullResponse);
}

seasonSearchUsingGET.displayName = "seasonSearchUsingGET";
export async function seasonSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/season/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SeasonBaseResponse);
}

seasonSearchUsingPOST.displayName = "seasonSearchUsingPOST";
export async function seasonSearchUsingPOST(
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
  {
    title,
    seasonNumberFrom,
    seasonNumberTo,
    numberOfEpisodesFrom,
    numberOfEpisodesTo,
  }: {
    title: string;
    seasonNumberFrom: number;
    seasonNumberTo: number;
    numberOfEpisodesFrom: number;
    numberOfEpisodesTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("seasonNumberFrom", String(seasonNumberFrom));
  fd.append("seasonNumberTo", String(seasonNumberTo));
  fd.append("numberOfEpisodesFrom", String(numberOfEpisodesFrom));
  fd.append("numberOfEpisodesTo", String(numberOfEpisodesTo));
  return fetch(
    `/season/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SeasonBaseResponse);
}

seriesUsingGET.displayName = "seriesUsingGET";
export async function seriesUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/series?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SeriesFullResponse);
}

seriesSearchUsingGET.displayName = "seriesSearchUsingGET";
export async function seriesSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/series/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SeriesBaseResponse);
}

seriesSearchUsingPOST.displayName = "seriesSearchUsingPOST";
export async function seriesSearchUsingPOST(
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
  {
    title,
    abbreviation,
    productionStartYearFrom,
    productionStartYearTo,
    productionEndYearFrom,
    productionEndYearTo,
    originalRunStartDateFrom,
    originalRunStartDateTo,
    originalRunEndDateFrom,
    originalRunEndDateTo,
  }: {
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
  fd.append("title", String(title));
  fd.append("abbreviation", String(abbreviation));
  fd.append("productionStartYearFrom", String(productionStartYearFrom));
  fd.append("productionStartYearTo", String(productionStartYearTo));
  fd.append("productionEndYearFrom", String(productionEndYearFrom));
  fd.append("productionEndYearTo", String(productionEndYearTo));
  fd.append("originalRunStartDateFrom", String(originalRunStartDateFrom));
  fd.append("originalRunStartDateTo", String(originalRunStartDateTo));
  fd.append("originalRunEndDateFrom", String(originalRunEndDateFrom));
  fd.append("originalRunEndDateTo", String(originalRunEndDateTo));
  return fetch(
    `/series/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SeriesBaseResponse);
}

soundtrackUsingGET.displayName = "soundtrackUsingGET";
export async function soundtrackUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/soundtrack?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SoundtrackFullResponse);
}

soundtrackSearchUsingGET.displayName = "soundtrackSearchUsingGET";
export async function soundtrackSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/soundtrack/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SoundtrackBaseResponse);
}

soundtrackSearchUsingPOST.displayName = "soundtrackSearchUsingPOST";
export async function soundtrackSearchUsingPOST(
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
  {
    title,
    releaseDateFrom,
    releaseDateTo,
    lengthFrom,
    lengthTo,
  }: {
    title: string;
    releaseDateFrom: string;
    releaseDateTo: string;
    lengthFrom: number;
    lengthTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("releaseDateFrom", String(releaseDateFrom));
  fd.append("releaseDateTo", String(releaseDateTo));
  fd.append("lengthFrom", String(lengthFrom));
  fd.append("lengthTo", String(lengthTo));
  return fetch(
    `/soundtrack/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SoundtrackBaseResponse);
}

spacecraftUsingGET.displayName = "spacecraftUsingGET";
export async function spacecraftUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/spacecraft?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftFullResponse);
}

spacecraftSearchUsingGET.displayName = "spacecraftSearchUsingGET";
export async function spacecraftSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/spacecraft/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftBaseResponse);
}

spacecraftSearchUsingPOST.displayName = "spacecraftSearchUsingPOST";
export async function spacecraftSearchUsingPOST(
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
  {
    name,
  }: {
    name: string;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  return fetch(
    `/spacecraft/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftBaseResponse);
}

spacecraftClassUsingGET.displayName = "spacecraftClassUsingGET";
export async function spacecraftClassUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/spacecraftClass?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftClassFullResponse);
}

spacecraftClassSearchUsingGET.displayName = "spacecraftClassSearchUsingGET";
export async function spacecraftClassSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/spacecraftClass/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftClassBaseResponse);
}

spacecraftClassSearchUsingPOST.displayName = "spacecraftClassSearchUsingPOST";
export async function spacecraftClassSearchUsingPOST(
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
  {
    name,
    warpCapableSpecies,
    alternateReality,
  }: {
    name: string;
    warpCapableSpecies: boolean;
    alternateReality: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("warpCapableSpecies", String(warpCapableSpecies));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/spacecraftClass/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SpacecraftClassBaseResponse);
}

speciesUsingGET.displayName = "speciesUsingGET";
export async function speciesUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/species?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpeciesFullResponse);
}

speciesSearchUsingGET.displayName = "speciesSearchUsingGET";
export async function speciesSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/species/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as SpeciesBaseResponse);
}

speciesSearchUsingPOST.displayName = "speciesSearchUsingPOST";
export async function speciesSearchUsingPOST(
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
  {
    name,
    extinctSpecies,
    warpCapableSpecies,
    extraGalacticSpecies,
    humanoidSpecies,
    reptilianSpecies,
    nonCorporealSpecies,
    shapeshiftingSpecies,
    spaceborneSpecies,
    telepathicSpecies,
    transDimensionalSpecies,
    unnamedSpecies,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("extinctSpecies", String(extinctSpecies));
  fd.append("warpCapableSpecies", String(warpCapableSpecies));
  fd.append("extraGalacticSpecies", String(extraGalacticSpecies));
  fd.append("humanoidSpecies", String(humanoidSpecies));
  fd.append("reptilianSpecies", String(reptilianSpecies));
  fd.append("nonCorporealSpecies", String(nonCorporealSpecies));
  fd.append("shapeshiftingSpecies", String(shapeshiftingSpecies));
  fd.append("spaceborneSpecies", String(spaceborneSpecies));
  fd.append("telepathicSpecies", String(telepathicSpecies));
  fd.append("transDimensionalSpecies", String(transDimensionalSpecies));
  fd.append("unnamedSpecies", String(unnamedSpecies));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/species/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as SpeciesBaseResponse);
}

staffUsingGET.displayName = "staffUsingGET";
export async function staffUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/staff?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as StaffFullResponse);
}

staffSearchUsingGET.displayName = "staffSearchUsingGET";
export async function staffSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/staff/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as StaffBaseResponse);
}

staffSearchUsingPOST.displayName = "staffSearchUsingPOST";
export async function staffSearchUsingPOST(
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
  {
    name,
    birthName,
    gender,
    dateOfBirthFrom,
    dateOfBirthTo,
    placeOfBirth,
    dateOfDeathFrom,
    dateOfDeathTo,
    placeOfDeath,
    artDepartment,
    artDirector,
    productionDesigner,
    cameraAndElectricalDepartment,
    cinematographer,
    castingDepartment,
    costumeDepartment,
    costumeDesigner,
    director,
    assistantOrSecondUnitDirector,
    exhibitAndAttractionStaff,
    filmEditor,
    linguist,
    locationStaff,
    makeupStaff,
    musicDepartment,
    composer,
    personalAssistant,
    producer,
    productionAssociate,
    productionStaff,
    publicationStaff,
    scienceConsultant,
    soundDepartment,
    specialAndVisualEffectsStaff,
    author,
    audioAuthor,
    calendarArtist,
    comicArtist,
    comicAuthor,
    comicColorArtist,
    comicInteriorArtist,
    comicInkArtist,
    comicPencilArtist,
    comicLetterArtist,
    comicStripArtist,
    gameArtist,
    gameAuthor,
    novelArtist,
    novelAuthor,
    referenceArtist,
    referenceAuthor,
    publicationArtist,
    publicationDesigner,
    publicationEditor,
    publicityArtist,
    cbsDigitalStaff,
    ilmProductionStaff,
    specialFeaturesStaff,
    storyEditor,
    studioExecutive,
    stuntDepartment,
    transportationDepartment,
    videoGameProductionStaff,
    writer,
  }: {
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
  fd.append("name", String(name));
  fd.append("birthName", String(birthName));
  fd.append("gender", String(gender));
  fd.append("dateOfBirthFrom", String(dateOfBirthFrom));
  fd.append("dateOfBirthTo", String(dateOfBirthTo));
  fd.append("placeOfBirth", String(placeOfBirth));
  fd.append("dateOfDeathFrom", String(dateOfDeathFrom));
  fd.append("dateOfDeathTo", String(dateOfDeathTo));
  fd.append("placeOfDeath", String(placeOfDeath));
  fd.append("artDepartment", String(artDepartment));
  fd.append("artDirector", String(artDirector));
  fd.append("productionDesigner", String(productionDesigner));
  fd.append(
    "cameraAndElectricalDepartment",
    String(cameraAndElectricalDepartment),
  );
  fd.append("cinematographer", String(cinematographer));
  fd.append("castingDepartment", String(castingDepartment));
  fd.append("costumeDepartment", String(costumeDepartment));
  fd.append("costumeDesigner", String(costumeDesigner));
  fd.append("director", String(director));
  fd.append(
    "assistantOrSecondUnitDirector",
    String(assistantOrSecondUnitDirector),
  );
  fd.append("exhibitAndAttractionStaff", String(exhibitAndAttractionStaff));
  fd.append("filmEditor", String(filmEditor));
  fd.append("linguist", String(linguist));
  fd.append("locationStaff", String(locationStaff));
  fd.append("makeupStaff", String(makeupStaff));
  fd.append("musicDepartment", String(musicDepartment));
  fd.append("composer", String(composer));
  fd.append("personalAssistant", String(personalAssistant));
  fd.append("producer", String(producer));
  fd.append("productionAssociate", String(productionAssociate));
  fd.append("productionStaff", String(productionStaff));
  fd.append("publicationStaff", String(publicationStaff));
  fd.append("scienceConsultant", String(scienceConsultant));
  fd.append("soundDepartment", String(soundDepartment));
  fd.append(
    "specialAndVisualEffectsStaff",
    String(specialAndVisualEffectsStaff),
  );
  fd.append("author", String(author));
  fd.append("audioAuthor", String(audioAuthor));
  fd.append("calendarArtist", String(calendarArtist));
  fd.append("comicArtist", String(comicArtist));
  fd.append("comicAuthor", String(comicAuthor));
  fd.append("comicColorArtist", String(comicColorArtist));
  fd.append("comicInteriorArtist", String(comicInteriorArtist));
  fd.append("comicInkArtist", String(comicInkArtist));
  fd.append("comicPencilArtist", String(comicPencilArtist));
  fd.append("comicLetterArtist", String(comicLetterArtist));
  fd.append("comicStripArtist", String(comicStripArtist));
  fd.append("gameArtist", String(gameArtist));
  fd.append("gameAuthor", String(gameAuthor));
  fd.append("novelArtist", String(novelArtist));
  fd.append("novelAuthor", String(novelAuthor));
  fd.append("referenceArtist", String(referenceArtist));
  fd.append("referenceAuthor", String(referenceAuthor));
  fd.append("publicationArtist", String(publicationArtist));
  fd.append("publicationDesigner", String(publicationDesigner));
  fd.append("publicationEditor", String(publicationEditor));
  fd.append("publicityArtist", String(publicityArtist));
  fd.append("cbsDigitalStaff", String(cbsDigitalStaff));
  fd.append("ilmProductionStaff", String(ilmProductionStaff));
  fd.append("specialFeaturesStaff", String(specialFeaturesStaff));
  fd.append("storyEditor", String(storyEditor));
  fd.append("studioExecutive", String(studioExecutive));
  fd.append("stuntDepartment", String(stuntDepartment));
  fd.append("transportationDepartment", String(transportationDepartment));
  fd.append("videoGameProductionStaff", String(videoGameProductionStaff));
  fd.append("writer", String(writer));
  return fetch(
    `/staff/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as StaffBaseResponse);
}

technologyUsingGET.displayName = "technologyUsingGET";
export async function technologyUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/technology?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TechnologyFullResponse);
}

technologySearchUsingGET.displayName = "technologySearchUsingGET";
export async function technologySearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/technology/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TechnologyBaseResponse);
}

technologySearchUsingPOST.displayName = "technologySearchUsingPOST";
export async function technologySearchUsingPOST(
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
  {
    name,
    borgTechnology,
    borgComponent,
    communicationsTechnology,
    computerTechnology,
    computerProgramming,
    subroutine,
    database,
    energyTechnology,
    fictionalTechnology,
    holographicTechnology,
    identificationTechnology,
    lifeSupportTechnology,
    sensorTechnology,
    shieldTechnology,
    tool,
    culinaryTool,
    engineeringTool,
    householdTool,
    medicalEquipment,
    transporterTechnology,
  }: {
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
  fd.append("name", String(name));
  fd.append("borgTechnology", String(borgTechnology));
  fd.append("borgComponent", String(borgComponent));
  fd.append("communicationsTechnology", String(communicationsTechnology));
  fd.append("computerTechnology", String(computerTechnology));
  fd.append("computerProgramming", String(computerProgramming));
  fd.append("subroutine", String(subroutine));
  fd.append("database", String(database));
  fd.append("energyTechnology", String(energyTechnology));
  fd.append("fictionalTechnology", String(fictionalTechnology));
  fd.append("holographicTechnology", String(holographicTechnology));
  fd.append("identificationTechnology", String(identificationTechnology));
  fd.append("lifeSupportTechnology", String(lifeSupportTechnology));
  fd.append("sensorTechnology", String(sensorTechnology));
  fd.append("shieldTechnology", String(shieldTechnology));
  fd.append("tool", String(tool));
  fd.append("culinaryTool", String(culinaryTool));
  fd.append("engineeringTool", String(engineeringTool));
  fd.append("householdTool", String(householdTool));
  fd.append("medicalEquipment", String(medicalEquipment));
  fd.append("transporterTechnology", String(transporterTechnology));
  return fetch(
    `/technology/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as TechnologyBaseResponse);
}

titleUsingGET.displayName = "titleUsingGET";
export async function titleUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/title?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TitleFullResponse);
}

titleSearchUsingGET.displayName = "titleSearchUsingGET";
export async function titleSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/title/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TitleBaseResponse);
}

titleSearchUsingPOST.displayName = "titleSearchUsingPOST";
export async function titleSearchUsingPOST(
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
  {
    name,
    militaryRank,
    fleetRank,
    religiousTitle,
    position,
    mirror,
  }: {
    name: string;
    militaryRank: boolean;
    fleetRank: boolean;
    religiousTitle: boolean;
    position: boolean;
    mirror: boolean;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("militaryRank", String(militaryRank));
  fd.append("fleetRank", String(fleetRank));
  fd.append("religiousTitle", String(religiousTitle));
  fd.append("position", String(position));
  fd.append("mirror", String(mirror));
  return fetch(
    `/title/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as TitleBaseResponse);
}

tradingCardUsingGET.displayName = "tradingCardUsingGET";
export async function tradingCardUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCard?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardFullResponse);
}

tradingCardSearchUsingGET.displayName = "tradingCardSearchUsingGET";
export async function tradingCardSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCard/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardBaseResponse);
}

tradingCardSearchUsingPOST.displayName = "tradingCardSearchUsingPOST";
export async function tradingCardSearchUsingPOST(
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
  {
    name,
    tradingCardDeckUid,
    tradingCardSetUid,
  }: {
    name: string;
    tradingCardDeckUid: string;
    tradingCardSetUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("tradingCardDeckUid", String(tradingCardDeckUid));
  fd.append("tradingCardSetUid", String(tradingCardSetUid));
  return fetch(
    `/tradingCard/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as TradingCardBaseResponse);
}

tradingCardDeckUsingGET.displayName = "tradingCardDeckUsingGET";
export async function tradingCardDeckUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCardDeck?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardDeckFullResponse);
}

tradingCardDeckSearchUsingGET.displayName = "tradingCardDeckSearchUsingGET";
export async function tradingCardDeckSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCardDeck/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardDeckBaseResponse);
}

tradingCardDeckSearchUsingPOST.displayName = "tradingCardDeckSearchUsingPOST";
export async function tradingCardDeckSearchUsingPOST(
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
  {
    name,
    tradingCardSetUid,
  }: {
    name: string;
    tradingCardSetUid: string;
  },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("tradingCardSetUid", String(tradingCardSetUid));
  return fetch(
    `/tradingCardDeck/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as TradingCardDeckBaseResponse);
}

tradingCardSetUsingGET.displayName = "tradingCardSetUsingGET";
export async function tradingCardSetUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCardSet?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardSetFullResponse);
}

tradingCardSetSearchUsingGET.displayName = "tradingCardSetSearchUsingGET";
export async function tradingCardSetSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/tradingCardSet/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as TradingCardSetBaseResponse);
}

tradingCardSetSearchUsingPOST.displayName = "tradingCardSetSearchUsingPOST";
export async function tradingCardSetSearchUsingPOST(
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
  {
    name,
    releaseYearFrom,
    releaseYearTo,
    cardsPerPackFrom,
    cardsPerPackTo,
    packsPerBoxFrom,
    packsPerBoxTo,
    boxesPerCaseFrom,
    boxesPerCaseTo,
    productionRunFrom,
    productionRunTo,
    productionRunUnit,
    cardWidthFrom,
    cardWidthTo,
    cardHeightFrom,
    cardHeightTo,
  }: {
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
  fd.append("name", String(name));
  fd.append("releaseYearFrom", String(releaseYearFrom));
  fd.append("releaseYearTo", String(releaseYearTo));
  fd.append("cardsPerPackFrom", String(cardsPerPackFrom));
  fd.append("cardsPerPackTo", String(cardsPerPackTo));
  fd.append("packsPerBoxFrom", String(packsPerBoxFrom));
  fd.append("packsPerBoxTo", String(packsPerBoxTo));
  fd.append("boxesPerCaseFrom", String(boxesPerCaseFrom));
  fd.append("boxesPerCaseTo", String(boxesPerCaseTo));
  fd.append("productionRunFrom", String(productionRunFrom));
  fd.append("productionRunTo", String(productionRunTo));
  fd.append("productionRunUnit", String(productionRunUnit));
  fd.append("cardWidthFrom", String(cardWidthFrom));
  fd.append("cardWidthTo", String(cardWidthTo));
  fd.append("cardHeightFrom", String(cardHeightFrom));
  fd.append("cardHeightTo", String(cardHeightTo));
  return fetch(
    `/tradingCardSet/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as TradingCardSetBaseResponse);
}

videoGameUsingGET.displayName = "videoGameUsingGET";
export async function videoGameUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/videoGame?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as VideoGameFullResponse);
}

videoGameSearchUsingGET.displayName = "videoGameSearchUsingGET";
export async function videoGameSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/videoGame/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as VideoGameBaseResponse);
}

videoGameSearchUsingPOST.displayName = "videoGameSearchUsingPOST";
export async function videoGameSearchUsingPOST(
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
  {
    title,
    releaseDateFrom,
    releaseDateTo,
  }: {
    title: string;
    releaseDateFrom: string;
    releaseDateTo: string;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("releaseDateFrom", String(releaseDateFrom));
  fd.append("releaseDateTo", String(releaseDateTo));
  return fetch(
    `/videoGame/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as VideoGameBaseResponse);
}

videoReleaseUsingGET.displayName = "videoReleaseUsingGET";
export async function videoReleaseUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/videoRelease?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as VideoReleaseFullResponse);
}

videoReleaseSearchUsingGET.displayName = "videoReleaseSearchUsingGET";
export async function videoReleaseSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/videoRelease/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as VideoReleaseBaseResponse);
}

videoReleaseSearchUsingPOST.displayName = "videoReleaseSearchUsingPOST";
export async function videoReleaseSearchUsingPOST(
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
  {
    title,
    yearFrom,
    yearTo,
    runTimeFrom,
    runTimeTo,
  }: {
    title: string;
    yearFrom: number;
    yearTo: number;
    runTimeFrom: number;
    runTimeTo: number;
  },
) {
  const fd = new FormData();
  fd.append("title", String(title));
  fd.append("yearFrom", String(yearFrom));
  fd.append("yearTo", String(yearTo));
  fd.append("runTimeFrom", String(runTimeFrom));
  fd.append("runTimeTo", String(runTimeTo));
  return fetch(
    `/videoRelease/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as VideoReleaseBaseResponse);
}

weaponUsingGET.displayName = "weaponUsingGET";
export async function weaponUsingGET({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey?: string;
}) {
  return fetch(
    `/weapon?uid=${encodeURIComponent(String(uid))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as WeaponFullResponse);
}

weaponSearchUsingGET.displayName = "weaponSearchUsingGET";
export async function weaponSearchUsingGET({
  pageNumber,
  pageSize,
  apiKey,
}: {
  pageNumber?: number;
  pageSize?: number;
  apiKey?: string;
}) {
  return fetch(
    `/weapon/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "GET",
    },
  ).then(async (resp) => (await resp.json()) as WeaponBaseResponse);
}

weaponSearchUsingPOST.displayName = "weaponSearchUsingPOST";
export async function weaponSearchUsingPOST(
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
  {
    name,
    handHeldWeapon,
    laserTechnology,
    plasmaTechnology,
    photonicTechnology,
    phaserTechnology,
    mirror,
    alternateReality,
  }: {
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
  fd.append("name", String(name));
  fd.append("handHeldWeapon", String(handHeldWeapon));
  fd.append("laserTechnology", String(laserTechnology));
  fd.append("plasmaTechnology", String(plasmaTechnology));
  fd.append("photonicTechnology", String(photonicTechnology));
  fd.append("phaserTechnology", String(phaserTechnology));
  fd.append("mirror", String(mirror));
  fd.append("alternateReality", String(alternateReality));
  return fetch(
    `/weapon/search?pageNumber=${encodeURIComponent(String(pageNumber))}&pageSize=${encodeURIComponent(String(pageSize))}&sort=${encodeURIComponent(String(sort))}&apiKey=${encodeURIComponent(String(apiKey))}`,
    {
      method: "POST",
      body: fd,
    },
  ).then(async (resp) => (await resp.json()) as WeaponBaseResponse);
}
