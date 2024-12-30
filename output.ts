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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<AnimalFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<AnimalBaseResponse>);
}

export async function animalSearchUsingPOST({
  name,
  earthAnimal,
  earthInsect,
  avian,
  canine,
  feline,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/animal/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      earthAnimal,
      earthInsect,
      avian,
      canine,
      feline,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<AnimalBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<AstronomicalObjectFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<AstronomicalObjectBaseResponse>);
}

export async function astronomicalObjectSearchUsingPOST({
  name,
  astronomicalObjectType,
  locationUid,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  astronomicalObjectType?: string;
  locationUid?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/astronomicalObject/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      astronomicalObjectType,
      locationUid,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<AstronomicalObjectBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookBaseResponse>);
}

export async function bookSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  novel?: boolean;
  referenceBook?: boolean;
  biographyBook?: boolean;
  rolePlayingBook?: boolean;
  eBook?: boolean;
  anthology?: boolean;
  novelization?: boolean;
  audiobook?: boolean;
  audiobookAbridged?: boolean;
  audiobookPublishedYearFrom?: number;
  audiobookPublishedYearTo?: number;
  audiobookRunTimeFrom?: number;
  audiobookRunTimeTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/book/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<BookBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookCollectionFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookCollectionBaseResponse>);
}

export async function bookCollectionSearchUsingPOST({
  title,
  publishedYearFrom,
  publishedYearTo,
  numberOfPagesFrom,
  numberOfPagesTo,
  stardateFrom,
  stardateTo,
  yearFrom,
  yearTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/bookCollection/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      publishedYearFrom,
      publishedYearTo,
      numberOfPagesFrom,
      numberOfPagesTo,
      stardateFrom,
      stardateTo,
      yearFrom,
      yearTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<BookCollectionBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookSeriesFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<BookSeriesBaseResponse>);
}

export async function bookSeriesSearchUsingPOST({
  title,
  publishedYearFrom,
  publishedYearTo,
  numberOfBooksFrom,
  numberOfBooksTo,
  yearFrom,
  yearTo,
  miniseries,
  eBookSeries,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfBooksFrom?: number;
  numberOfBooksTo?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  eBookSeries?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/bookSeries/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      publishedYearFrom,
      publishedYearTo,
      numberOfBooksFrom,
      numberOfBooksTo,
      yearFrom,
      yearTo,
      miniseries,
      eBookSeries,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<BookSeriesBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<CharacterFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<CharacterBaseResponse>);
}

export async function characterSearchUsingPOST({
  name,
  gender,
  deceased,
  hologram,
  fictionalCharacter,
  mirror,
  alternateReality,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  gender?: string;
  deceased?: boolean;
  hologram?: boolean;
  fictionalCharacter?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/character/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      gender,
      deceased,
      hologram,
      fictionalCharacter,
      mirror,
      alternateReality,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<CharacterBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicsFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicsBaseResponse>);
}

export async function comicsSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
  adaptation?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/comics/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ComicsBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicCollectionFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicCollectionBaseResponse>);
}

export async function comicCollectionSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  photonovel?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/comicCollection/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ComicCollectionBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicSeriesFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicSeriesBaseResponse>);
}

export async function comicSeriesSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfIssuesFrom?: number;
  numberOfIssuesTo?: number;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  miniseries?: boolean;
  photonovelSeries?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/comicSeries/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ComicSeriesBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicStripFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ComicStripBaseResponse>);
}

export async function comicStripSearchUsingPOST({
  title,
  publishedYearFrom,
  publishedYearTo,
  numberOfPagesFrom,
  numberOfPagesTo,
  yearFrom,
  yearTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  yearFrom?: number;
  yearTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/comicStrip/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      publishedYearFrom,
      publishedYearTo,
      numberOfPagesFrom,
      numberOfPagesTo,
      yearFrom,
      yearTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ComicStripBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<CompanyFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<CompanyBaseResponse>);
}

export async function companySearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/company/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<CompanyBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ConflictFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ConflictBaseResponse>);
}

export async function conflictSearchUsingPOST({
  name,
  yearFrom,
  yearTo,
  earthConflict,
  federationWar,
  klingonWar,
  dominionWarBattle,
  alternateReality,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  yearFrom?: number;
  yearTo?: number;
  earthConflict?: boolean;
  federationWar?: boolean;
  klingonWar?: boolean;
  dominionWarBattle?: boolean;
  alternateReality?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/conflict/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      yearFrom,
      yearTo,
      earthConflict,
      federationWar,
      klingonWar,
      dominionWarBattle,
      alternateReality,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ConflictBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ElementFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<ElementBaseResponse>);
}

export async function elementSearchUsingPOST({
  name,
  symbolObject,
  transuranium,
  gammaSeries,
  hypersonicSeries,
  megaSeries,
  omegaSeries,
  transonicSeries,
  worldSeries,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  symbolObject?: string;
  transuranium?: boolean;
  gammaSeries?: boolean;
  hypersonicSeries?: boolean;
  megaSeries?: boolean;
  omegaSeries?: boolean;
  transonicSeries?: boolean;
  worldSeries?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/element/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      symbolObject,
      transuranium,
      gammaSeries,
      hypersonicSeries,
      megaSeries,
      omegaSeries,
      transonicSeries,
      worldSeries,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<ElementBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<EpisodeFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<EpisodeBaseResponse>);
}

export async function episodeSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  seasonNumberFrom?: number;
  seasonNumberTo?: number;
  episodeNumberFrom?: number;
  episodeNumberTo?: number;
  productionSerialNumber?: string;
  featureLength?: boolean;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usAirDateFrom?: string;
  usAirDateTo?: string;
  finalScriptDateFrom?: string;
  finalScriptDateTo?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/episode/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<EpisodeBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<FoodFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<FoodBaseResponse>);
}

export async function foodSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/food/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<FoodBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<LiteratureFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<LiteratureBaseResponse>);
}

export async function literatureSearchUsingPOST({
  title,
  earthlyOrigin,
  shakespeareanWork,
  report,
  scientificLiterature,
  technicalManual,
  religiousLiterature,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  earthlyOrigin?: boolean;
  shakespeareanWork?: boolean;
  report?: boolean;
  scientificLiterature?: boolean;
  technicalManual?: boolean;
  religiousLiterature?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/literature/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      earthlyOrigin,
      shakespeareanWork,
      report,
      scientificLiterature,
      technicalManual,
      religiousLiterature,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<LiteratureBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<LocationFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<LocationBaseResponse>);
}

export async function locationSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/location/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<LocationBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MagazineFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MagazineBaseResponse>);
}

export async function magazineSearchUsingPOST({
  title,
  publishedYearFrom,
  publishedYearTo,
  numberOfPagesFrom,
  numberOfPagesTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfPagesFrom?: number;
  numberOfPagesTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/magazine/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      publishedYearFrom,
      publishedYearTo,
      numberOfPagesFrom,
      numberOfPagesTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<MagazineBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MagazineSeriesFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MagazineSeriesBaseResponse>);
}

export async function magazineSeriesSearchUsingPOST({
  title,
  publishedYearFrom,
  publishedYearTo,
  numberOfIssuesFrom,
  numberOfIssuesTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfIssuesFrom?: number;
  numberOfIssuesTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/magazineSeries/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      publishedYearFrom,
      publishedYearTo,
      numberOfIssuesFrom,
      numberOfIssuesTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<MagazineSeriesBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MaterialFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MaterialBaseResponse>);
}

export async function materialSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/material/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<MaterialBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MedicalConditionFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MedicalConditionBaseResponse>);
}

export async function medicalConditionSearchUsingPOST({
  name,
  psychologicalCondition,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  psychologicalCondition?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/medicalCondition/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      psychologicalCondition,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<MedicalConditionBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MovieFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<MovieBaseResponse>);
}

export async function movieSearchUsingPOST({
  title,
  stardateFrom,
  stardateTo,
  yearFrom,
  yearTo,
  usReleaseDateFrom,
  usReleaseDateTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  stardateFrom?: number;
  stardateTo?: number;
  yearFrom?: number;
  yearTo?: number;
  usReleaseDateFrom?: string;
  usReleaseDateTo?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/movie/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      stardateFrom,
      stardateTo,
      yearFrom,
      yearTo,
      usReleaseDateFrom,
      usReleaseDateTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<MovieBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<OccupationFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<OccupationBaseResponse>);
}

export async function occupationSearchUsingPOST({
  name,
  legalOccupation,
  medicalOccupation,
  scientificOccupation,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  legalOccupation?: boolean;
  medicalOccupation?: boolean;
  scientificOccupation?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/occupation/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      legalOccupation,
      medicalOccupation,
      scientificOccupation,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<OccupationBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<OrganizationFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<OrganizationBaseResponse>);
}

export async function organizationSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/organization/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<OrganizationBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<PerformerFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<PerformerBaseResponse>);
}

export async function performerSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  birthName?: string;
  gender?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  placeOfBirth?: string;
  dateOfDeathFrom?: string;
  dateOfDeathTo?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/performer/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<PerformerBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SeasonFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SeasonBaseResponse>);
}

export async function seasonSearchUsingPOST({
  title,
  seasonNumberFrom,
  seasonNumberTo,
  numberOfEpisodesFrom,
  numberOfEpisodesTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  seasonNumberFrom?: number;
  seasonNumberTo?: number;
  numberOfEpisodesFrom?: number;
  numberOfEpisodesTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/season/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      seasonNumberFrom,
      seasonNumberTo,
      numberOfEpisodesFrom,
      numberOfEpisodesTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SeasonBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SeriesFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SeriesBaseResponse>);
}

export async function seriesSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  abbreviation?: string;
  productionStartYearFrom?: number;
  productionStartYearTo?: number;
  productionEndYearFrom?: number;
  productionEndYearTo?: number;
  originalRunStartDateFrom?: string;
  originalRunStartDateTo?: string;
  originalRunEndDateFrom?: string;
  originalRunEndDateTo?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/series/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SeriesBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SoundtrackFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SoundtrackBaseResponse>);
}

export async function soundtrackSearchUsingPOST({
  title,
  releaseDateFrom,
  releaseDateTo,
  lengthFrom,
  lengthTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  releaseDateFrom?: string;
  releaseDateTo?: string;
  lengthFrom?: number;
  lengthTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/soundtrack/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      releaseDateFrom,
      releaseDateTo,
      lengthFrom,
      lengthTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SoundtrackBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpacecraftFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpacecraftBaseResponse>);
}

export async function spacecraftSearchUsingPOST({
  name,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/spacecraft/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SpacecraftBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpacecraftClassFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpacecraftClassBaseResponse>);
}

export async function spacecraftClassSearchUsingPOST({
  name,
  warpCapableSpecies,
  alternateReality,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  warpCapableSpecies?: boolean;
  alternateReality?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/spacecraftClass/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      warpCapableSpecies,
      alternateReality,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SpacecraftClassBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpeciesFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<SpeciesBaseResponse>);
}

export async function speciesSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/species/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<SpeciesBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<StaffFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<StaffBaseResponse>);
}

export async function staffSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  birthName?: string;
  gender?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  placeOfBirth?: string;
  dateOfDeathFrom?: string;
  dateOfDeathTo?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/staff/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<StaffBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TechnologyFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TechnologyBaseResponse>);
}

export async function technologySearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
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
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/technology/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<TechnologyBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TitleFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TitleBaseResponse>);
}

export async function titleSearchUsingPOST({
  name,
  militaryRank,
  fleetRank,
  religiousTitle,
  position,
  mirror,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  militaryRank?: boolean;
  fleetRank?: boolean;
  religiousTitle?: boolean;
  position?: boolean;
  mirror?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/title/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      militaryRank,
      fleetRank,
      religiousTitle,
      position,
      mirror,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<TitleBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardBaseResponse>);
}

export async function tradingCardSearchUsingPOST({
  name,
  tradingCardDeckUid,
  tradingCardSetUid,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  tradingCardDeckUid?: string;
  tradingCardSetUid?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/tradingCard/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      tradingCardDeckUid,
      tradingCardSetUid,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<TradingCardBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardDeckFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardDeckBaseResponse>);
}

export async function tradingCardDeckSearchUsingPOST({
  name,
  tradingCardSetUid,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  tradingCardSetUid?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/tradingCardDeck/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      tradingCardSetUid,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<TradingCardDeckBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardSetFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<TradingCardSetBaseResponse>);
}

export async function tradingCardSetSearchUsingPOST({
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
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  releaseYearFrom?: number;
  releaseYearTo?: number;
  cardsPerPackFrom?: number;
  cardsPerPackTo?: number;
  packsPerBoxFrom?: number;
  packsPerBoxTo?: number;
  boxesPerCaseFrom?: number;
  boxesPerCaseTo?: number;
  productionRunFrom?: number;
  productionRunTo?: number;
  productionRunUnit?: string;
  cardWidthFrom?: number;
  cardWidthTo?: number;
  cardHeightFrom?: number;
  cardHeightTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/tradingCardSet/search`, {
    method: "POST",
    body: JSON.stringify({
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
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<TradingCardSetBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<VideoGameFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<VideoGameBaseResponse>);
}

export async function videoGameSearchUsingPOST({
  title,
  releaseDateFrom,
  releaseDateTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  releaseDateFrom?: string;
  releaseDateTo?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/videoGame/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      releaseDateFrom,
      releaseDateTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<VideoGameBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<VideoReleaseFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<VideoReleaseBaseResponse>);
}

export async function videoReleaseSearchUsingPOST({
  title,
  yearFrom,
  yearTo,
  runTimeFrom,
  runTimeTo,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  title?: string;
  yearFrom?: number;
  yearTo?: number;
  runTimeFrom?: number;
  runTimeTo?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/videoRelease/search`, {
    method: "POST",
    body: JSON.stringify({
      title,
      yearFrom,
      yearTo,
      runTimeFrom,
      runTimeTo,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<VideoReleaseBaseResponse>);
}

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
      body: JSON.stringify({
        uid,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<WeaponFullResponse>);
}

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
      body: JSON.stringify({
        pageNumber,
        pageSize,
        apiKey,
      }),
    },
  ).then((res) => res.json() as Promise<WeaponBaseResponse>);
}

export async function weaponSearchUsingPOST({
  name,
  handHeldWeapon,
  laserTechnology,
  plasmaTechnology,
  photonicTechnology,
  phaserTechnology,
  mirror,
  alternateReality,
  pageNumber,
  pageSize,
  sort,
  apiKey,
}: {
  name?: string;
  handHeldWeapon?: boolean;
  laserTechnology?: boolean;
  plasmaTechnology?: boolean;
  photonicTechnology?: boolean;
  phaserTechnology?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  apiKey?: string;
}) {
  return fetch(`/weapon/search`, {
    method: "POST",
    body: JSON.stringify({
      name,
      handHeldWeapon,
      laserTechnology,
      plasmaTechnology,
      photonicTechnology,
      phaserTechnology,
      mirror,
      alternateReality,
      pageNumber,
      pageSize,
      sort,
      apiKey,
    }),
  }).then((res) => res.json() as Promise<WeaponBaseResponse>);
}
