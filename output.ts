/**
 * 1.0.0
 * STAPI
 *
 */

export type AnimalHeader = {
  /** @description Animal unique ID */
  uid: string;
  /** @description Animal name */
  name: string;
};

export type AnimalBase = {
  /** @description Animal unique ID */
  uid: string;
  /** @description Animal name */
  name: string;
  /** @description Whether it's an earth animal */
  earthAnimal?: boolean;
  /** @description Whether it's an earth insect */
  earthInsect?: boolean;
  /** @description Whether it's an avian */
  avian?: boolean;
  /** @description Whether it's a canine */
  canine?: boolean;
  /** @description Whether it's a feline */
  feline?: boolean;
};

export type AnimalFull = {
  /** @description Animal unique ID */
  uid: string;
  /** @description Animal name */
  name: string;
  /** @description Whether it's an earth animal */
  earthAnimal?: boolean;
  /** @description Whether it's an earth insect */
  earthInsect?: boolean;
  /** @description Whether it's an avian */
  avian?: boolean;
  /** @description Whether it's a canine */
  canine?: boolean;
  /** @description Whether it's a feline */
  feline?: boolean;
};

export type AnimalBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of animals matching given criteria */
  animals?: AnimalBase[];
};

export type AnimalFullResponse = {
  animal?: AnimalFull;
};

export type AstronomicalObjectHeader = {
  /** @description Astronomical object's unique ID */
  uid: string;
  /** @description Astronomical object name */
  name: string;
};

export type AstronomicalObjectBase = {
  /** @description Astronomical object's unique ID */
  uid: string;
  /** @description Astronomical object name */
  name: string;
  astronomicalObjectType?: AstronomicalObjectType;
  location?: AstronomicalObjectHeader;
};

export type AstronomicalObjectFull = {
  /** @description Astronomical object's unique ID */
  uid: string;
  /** @description Astronomical object name */
  name: string;
  astronomicalObjectType?: AstronomicalObjectType;
  location?: AstronomicalObjectBase;
  /** @description Astronomical objects located in this astronomical object, like planets in a star system */
  astronomicalObjects?: AstronomicalObjectBase[];
};

export type AstronomicalObjectBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of astronomical objects matching given criteria */
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
  /** @description Book unique ID */
  uid: string;
  /** @description Book title */
  title: string;
};

export type BookBase = {
  /** @description Book unique ID */
  uid: string;
  /** @description Book title */
  title: string;
  /** @description Year the book was published */
  publishedYear?: number;
  /** @description Month the book was published */
  publishedMonth?: number;
  /** @description Day the book was published */
  publishedDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of book story */
  stardateFrom?: number;
  /** @description Ending stardate of book story */
  stardateTo?: number;
  /** @description Starting year of book story */
  yearFrom?: number;
  /** @description Ending year of book story */
  yearTo?: number;
  /** @description Whether it's a novel */
  novel: boolean;
  /** @description Whether it's a reference book */
  referenceBook: boolean;
  /** @description Whether it's a biography book */
  biographyBook: boolean;
  /** @description Whether it's a role playing book */
  rolePlayingBook: boolean;
  /** @description Whether it's an eBook */
  eBook: boolean;
  /** @description Whether it's an anthology */
  anthology: boolean;
  /** @description Whether it's a novelization */
  novelization: boolean;
  /** @description Whether it's an audiobook, or has been release as an audiobook in addition to other form */
  audiobook: boolean;
  /** @description If it's an audiobook, whether it's been abridged */
  audiobookAbridged: boolean;
  /** @description Year the audiobook was published */
  audiobookPublishedYear?: number;
  /** @description Month the audiobook was published */
  audiobookPublishedMonth?: number;
  /** @description Day the audiobook was published */
  audiobookPublishedDay?: number;
  /** @description Audiobook run time, in minutes */
  audiobookRunTime?: number;
  /** @description Book's production number */
  productionNumber?: string;
};

export type BookFull = {
  /** @description Book unique ID */
  uid: string;
  /** @description Book title */
  title: string;
  /** @description Year the book was published */
  publishedYear?: number;
  /** @description Month the book was published */
  publishedMonth?: number;
  /** @description Day the book was published */
  publishedDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of book story */
  stardateFrom?: number;
  /** @description Ending stardate of book story */
  stardateTo?: number;
  /** @description Starting year of book story */
  yearFrom?: number;
  /** @description Ending year of book story */
  yearTo?: number;
  /** @description Whether it's a novel */
  novel: boolean;
  /** @description Whether it's a reference book */
  referenceBook: boolean;
  /** @description Whether it's a biography book */
  biographyBook: boolean;
  /** @description Whether it's a role playing book */
  rolePlayingBook: boolean;
  /** @description Whether it's an e-book */
  eBook: boolean;
  /** @description Whether it's an anthology */
  anthology: boolean;
  /** @description Whether it's a novelization */
  novelization: boolean;
  /** @description Whether it's an audiobook, or has been release as an audiobook in addition to other form */
  audiobook: boolean;
  /** @description If it's an audiobook, whether it's been abridged */
  audiobookAbridged: boolean;
  /** @description Year the audiobook was published */
  audiobookPublishedYear?: number;
  /** @description Month the audiobook was published */
  audiobookPublishedMonth?: number;
  /** @description Day the audiobook was published */
  audiobookPublishedDay?: number;
  /** @description Audiobook run time, in minutes */
  audiobookRunTime?: number;
  /** @description Book production number */
  productionNumber?: string;
  /** @description Book series this book is included in */
  bookSeries?: BookSeriesBase[];
  /** @description Authors of the book */
  authors?: StaffBase[];
  /** @description Artists involved in the book */
  artists?: StaffBase[];
  /** @description Editors involved in the book */
  editors?: StaffBase[];
  /** @description Audiobook narrators */
  audiobookNarrators?: StaffBase[];
  /** @description Book publishers */
  publishers?: CompanyBase[];
  /** @description Audiobook publishers */
  audiobookPublishers?: CompanyBase[];
  /** @description Characters appearing the book */
  characters?: CharacterBase[];
  /** @description References */
  references?: Reference[];
  /** @description Audiobook references */
  audiobookReferences?: Reference[];
  /** @description Book collections this book is included in */
  bookCollections?: BookCollectionBase[];
};

export type BookBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of books matching given criteria */
  books?: BookBase[];
};

export type BookFullResponse = {
  book?: BookFull;
};

export type BookCollectionHeader = {
  /** @description Book collection unique ID */
  uid?: string;
  /** @description Book collection title */
  title?: string;
};

export type BookCollectionBase = {
  /** @description Book collection unique ID */
  uid?: string;
  /** @description Book collection title */
  title?: string;
  /** @description Year the book collection was published */
  publishedYear?: number;
  /** @description Month the book collection was published */
  publishedMonth?: number;
  /** @description Day the book collection was published */
  publishedDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of book collection stories */
  stardateFrom?: number;
  /** @description Ending stardate of book collection stories */
  stardateTo?: number;
  /** @description Starting year of book collection stories */
  yearFrom?: number;
  /** @description Ending year of book collection stories */
  yearTo?: number;
};

export type BookCollectionFull = {
  /** @description Book collection unique ID */
  uid?: string;
  /** @description Book collection title */
  title?: string;
  /** @description Year the book collection was published */
  publishedYear?: number;
  /** @description Month the book collection was published */
  publishedMonth?: number;
  /** @description Day the book collection was published */
  publishedDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of book collection stories */
  stardateFrom?: number;
  /** @description Ending stardate of book collection stories */
  stardateTo?: number;
  /** @description Starting year of book collection stories */
  yearFrom?: number;
  /** @description Ending year of book collection stories */
  yearTo?: number;
  /** @description Book series this book collection is included in */
  bookSeries?: BookSeriesBase[];
  /** @description Authors of the book collection */
  authors?: StaffBase[];
  /** @description Artists involved in the book collection */
  artists?: StaffBase[];
  /** @description Editors involved in the book collection */
  editors?: StaffBase[];
  /** @description Book collection publishers */
  publishers?: CompanyBase[];
  /** @description Characters appearing in the book collection */
  characters?: CharacterBase[];
  /** @description References */
  references?: Reference[];
  /** @description Books included in this book collection */
  books?: BookBase[];
};

export type BookCollectionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of book collections matching given criteria */
  bookCollections?: BookCollectionBase[];
};

export type BookCollectionFullResponse = {
  bookCollection?: BookCollectionFull;
};

export type BookSeriesHeader = {
  /** @description Book series unique ID */
  uid?: string;
  /** @description Book series title */
  title?: string;
};

export type BookSeriesBase = {
  /** @description Book series unique ID */
  uid: string;
  /** @description Book series title */
  title: string;
  /** @description Year from which the book series was published */
  publishedYearFrom?: number;
  /** @description Month from which the book series was published */
  publishedMonthFrom?: number;
  /** @description Year to which the book series was published */
  publishedYearTo?: number;
  /** @description Month to which the book series was published */
  publishedMonthTo?: number;
  /** @description Number of pages */
  numberOfBooks?: number;
  /** @description Starting year of book series stories */
  yearFrom?: number;
  /** @description Ending year of book series stories */
  yearTo?: number;
  /** @description Whether it's a miniseries */
  miniseries?: boolean;
  /** @description Whether it's a e-book series */
  eBookSeries?: boolean;
};

export type BookSeriesFull = {
  /** @description Book series unique ID */
  uid: string;
  /** @description Book series title */
  title: string;
  /** @description Year from which the book series was published */
  publishedYearFrom?: number;
  /** @description Month from which the book series was published */
  publishedMonthFrom?: number;
  /** @description Year to which the book series was published */
  publishedYearTo?: number;
  /** @description Month to which the book series was published */
  publishedMonthTo?: number;
  /** @description Number of books in book series */
  numberOfBooks?: number;
  /** @description Starting year of book series stories */
  yearFrom?: number;
  /** @description Ending year of book series stories */
  yearTo?: number;
  /** @description Whether it's a miniseries */
  miniseries?: boolean;
  /** @description Whether it's a e-book series */
  eBookSeries?: boolean;
  /** @description Book series this book series is included in */
  parentSeries?: BookSeriesBase[];
  /** @description Child book series included in this book series */
  childSeries?: BookSeriesBase[];
  /** @description Companies that published this book series */
  publishers?: CompanyBase[];
  /** @description Books included in this book series */
  books?: BookBase[];
};

export type BookSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of book series matching given criteria */
  bookSeries?: BookSeriesBase[];
};

export type BookSeriesFullResponse = {
  bookSeries?: BookSeriesFull;
};

export type CharacterHeader = {
  /** @description Character unique ID */
  uid: string;
  /** @description Character name */
  name: string;
};

export type CharacterBase = {
  /** @description Character unique ID */
  uid: string;
  /** @description Character name */
  name: string;
  gender?: Gender;
  /** @description Year the character was born */
  yearOfBirth?: number;
  /** @description Month the character was born */
  monthOfBirth?: number;
  /** @description Day the character was born */
  dayOfBirth?: number;
  /** @description Place of birth */
  placeOfBirth?: string;
  /** @description Year the character died */
  yearOfDeath?: number;
  /** @description Month the character died */
  monthOfDeath?: number;
  /** @description Day the character died */
  dayOfDeath?: number;
  /** @description Place of death */
  placeOfDeath?: string;
  /** @description Height in centimeters */
  height?: number;
  /** @description Weight in kilograms */
  weight?: number;
  /** @description Whether this character is deceased */
  deceased?: boolean;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  /** @description Serial number */
  serialNumber?: string;
  /** @description Hologram activation date */
  hologramActivationDate?: string;
  /** @description Hologram status */
  hologramStatus?: string;
  /** @description Hologram date status */
  hologramDateStatus?: string;
  /** @description Whether this character is a hologram */
  hologram?: boolean;
  /** @description Whether this character is a fictional character (from universe point of view) */
  fictionalCharacter?: boolean;
  /** @description Whether this character is from mirror universe */
  mirror?: boolean;
  /** @description Whether this character is from alternate reality */
  alternateReality?: boolean;
};

export type CharacterFull = {
  /** @description Character unique ID */
  uid: string;
  /** @description Character name */
  name: string;
  gender?: Gender;
  /** @description Year the character was born */
  yearOfBirth?: number;
  /** @description Month the character was born */
  monthOfBirth?: number;
  /** @description Day the character was born */
  dayOfBirth?: number;
  /** @description Place of birth */
  placeOfBirth?: string;
  /** @description Year the character died */
  yearOfDeath?: number;
  /** @description Month the character died */
  monthOfDeath?: number;
  /** @description Day the character died */
  dayOfDeath?: number;
  /** @description Place of death */
  placeOfDeath?: string;
  /** @description Height in centimeters */
  height?: number;
  /** @description Weight in kilograms */
  weight?: number;
  /** @description Whether this character is deceased */
  deceased?: boolean;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  /** @description Serial number */
  serialNumber?: string;
  /** @description Hologram activation date */
  hologramActivationDate?: string;
  /** @description Hologram status */
  hologramStatus?: string;
  /** @description Hologram date status */
  hologramDateStatus?: string;
  /** @description Whether this character is a hologram */
  hologram?: boolean;
  /** @description Whether this character is a fictional character (from universe point of view) */
  fictionalCharacter?: boolean;
  /** @description Whether this character is from mirror universe */
  mirror?: boolean;
  /** @description Whether this character is from alternate reality */
  alternateReality?: boolean;
  /** @description Performers who played this character */
  performers?: PerformerBase[];
  /** @description Episodes in which this character appeared */
  episodes?: EpisodeBase[];
  /** @description Movies in which this character appeared */
  movies?: MovieBase[];
  /** @description Species this character belongs to */
  characterSpecies?: CharacterSpecies[];
  /** @description Relations with other characters */
  characterRelations?: CharacterRelation[];
  /** @description Titles this character holds */
  titles?: TitleBase[];
  /** @description Occupations of this character */
  occupations?: OccupationBase[];
  /** @description Organizations this character has affiliation with */
  organizations?: OrganizationBase[];
};

export type CharacterBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of characters matching given criteria */
  characters?: CharacterBase[];
};

export type CharacterFullResponse = {
  character?: CharacterFull;
};

export type CharacterRelation = {
  /** @description Relation type */
  typeObject?: string;
  source?: CharacterHeader;
  target?: CharacterHeader;
};

export type CharacterSpecies = {
  /** @description Entity unique ID */
  uid?: string;
  /** @description Species name */
  name?: string;
  /** @description Numerator */
  numerator?: number;
  /** @description Denominator */
  denominator?: number;
};

export type ComicsHeader = {
  /** @description Comics unique ID */
  uid: string;
  /** @description Comics title */
  title: string;
};

export type ComicsBase = {
  /** @description Comics unique ID */
  uid: string;
  /** @description Comics title */
  title: string;
  /** @description Year the comics was published */
  publishedYear?: number;
  /** @description Month the comics was published */
  publishedMonth?: number;
  /** @description Day the comics was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of comic story */
  stardateFrom?: number;
  /** @description Ending stardate of comic story */
  stardateTo?: number;
  /** @description Starting year of comic story */
  yearFrom?: number;
  /** @description Ending year of comic story */
  yearTo?: number;
  /** @description Whether it's a photonovel */
  photonovel?: boolean;
  /** @description Whether it's an adaptation of an episode or a movie */
  adaptation?: boolean;
};

export type ComicsFull = {
  /** @description Comics unique ID */
  uid: string;
  /** @description Comics title */
  title: string;
  /** @description Year the comics was published */
  publishedYear?: number;
  /** @description Month the comics was published */
  publishedMonth?: number;
  /** @description Day the comics was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of comic story */
  stardateFrom?: number;
  /** @description Ending stardate of comic story */
  stardateTo?: number;
  /** @description Starting year of comic  story */
  yearFrom?: number;
  /** @description Ending year of comic story */
  yearTo?: number;
  /** @description Whether it's a photonovel */
  photonovel?: boolean;
  /** @description Whether it's an adaptation of an episode or a movie */
  adaptation?: boolean;
  /** @description Comic series this comics is included in */
  comicSeries?: ComicSeriesBase[];
  /** @description Writers involved in the comics */
  writers?: StaffBase[];
  /** @description Artists involved in the comics */
  artists?: StaffBase[];
  /** @description Editors involved in the comics */
  editors?: StaffBase[];
  /** @description Other staff involved in the comics */
  staff?: StaffBase[];
  /** @description Comics publishers */
  publishers?: CompanyBase[];
  /** @description Characters appearing in the comics */
  characters?: CharacterBase[];
  /** @description References */
  references?: Reference[];
  /** @description Comic collections this comics is included in */
  comicCollections?: ComicCollectionBase[];
};

export type ComicsBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of comics matching given criteria */
  comics?: ComicsBase[];
};

export type ComicsFullResponse = {
  comics?: ComicsFull;
};

export type ComicCollectionHeader = {
  /** @description Comic collection unique ID */
  uid: string;
  /** @description Comic collection title */
  title: string;
};

export type ComicCollectionBase = {
  /** @description Comic collection unique ID */
  uid: string;
  /** @description Comic collection title */
  title: string;
  /** @description Year the comic collection was published */
  publishedYear?: number;
  /** @description Month the comic collection was published */
  publishedMonth?: number;
  /** @description Day the comic collection was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of comic collection stories */
  stardateFrom?: number;
  /** @description Ending stardate of comic collection stories */
  stardateTo?: number;
  /** @description Starting year of comic collection stories */
  yearFrom?: number;
  /** @description Ending year of comic collection stories */
  yearTo?: number;
  /** @description Whether it's a photonovel collection */
  photonovel?: boolean;
};

export type ComicCollectionFull = {
  /** @description Comic collection unique ID */
  uid: string;
  /** @description Comic collection title */
  title: string;
  /** @description Year the comic collection was published */
  publishedYear?: number;
  /** @description Month the comic collection was published */
  publishedMonth?: number;
  /** @description Day the comic collection was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting stardate of comic collection stories */
  stardateFrom?: number;
  /** @description Ending stardate of comic collection stories */
  stardateTo?: number;
  /** @description Starting year of comic collection stories */
  yearFrom?: number;
  /** @description Ending year of comic collection stories */
  yearTo?: number;
  /** @description Whether it's a photonovel collection */
  photonovel?: boolean;
  /** @description Comic series this comic collection is included in */
  comicSeries?: ComicSeriesBase[];
  /** @description Writers involved in the comic collection */
  writers?: StaffBase[];
  /** @description Artists involved in the comic collection */
  artists?: StaffBase[];
  /** @description Editors involved in the comic collection */
  editors?: StaffBase[];
  /** @description Other staff involved in the comic collection */
  staff?: StaffBase[];
  /** @description Comic collection publishers */
  publishers?: CompanyBase[];
  /** @description Characters appearing in the comic collection */
  characters?: CharacterBase[];
  /** @description References */
  references?: Reference[];
  /** @description Comics included in this comic collection */
  comics?: ComicsBase[];
};

export type ComicCollectionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of comic collections matching given criteria */
  comicCollections?: ComicCollectionBase[];
};

export type ComicCollectionFullResponse = {
  comicCollection?: ComicCollectionFull;
};

export type ComicSeriesHeader = {
  /** @description Comic series unique ID */
  uid: string;
  /** @description Comic series title */
  title: string;
};

export type ComicSeriesBase = {
  /** @description Comic series unique ID */
  uid: string;
  /** @description Comic series title */
  title: string;
  /** @description Year from which the comic series was published */
  publishedYearFrom?: number;
  /** @description Month from which the comic series was published */
  publishedMonthFrom?: number;
  /** @description Day from which the comic series was published */
  publishedDayFrom?: number;
  /** @description Year to which the comic series was published */
  publishedYearTo?: number;
  /** @description Month to which the comic series was published */
  publishedMonthTo?: number;
  /** @description Day to which the comic series was published */
  publishedDayTo?: number;
  /** @description Number of issues */
  numberOfIssues?: number;
  /** @description Starting stardate of comic series stories */
  stardateFrom?: number;
  /** @description Ending stardate of comic series stories */
  stardateTo?: number;
  /** @description Starting year of comic series stories */
  yearFrom?: number;
  /** @description Ending year of comic series stories */
  yearTo?: number;
  /** @description Whether it's a miniseries */
  miniseries?: boolean;
  /** @description Whether it's a photonovel series */
  photonovelSeries?: boolean;
};

export type ComicSeriesFull = {
  /** @description Comic series unique ID */
  uid: string;
  /** @description Comic series title */
  title: string;
  /** @description Year from which the comic series was published */
  publishedYearFrom?: number;
  /** @description Month from which the comic series was published */
  publishedMonthFrom?: number;
  /** @description Day from which the comic series was published */
  publishedDayFrom?: number;
  /** @description Year to which the comic series was published */
  publishedYearTo?: number;
  /** @description Month to which the comic series was published */
  publishedMonthTo?: number;
  /** @description Day to which the comic series was published */
  publishedDayTo?: number;
  /** @description Number of issues */
  numberOfIssues?: number;
  /** @description Starting stardate of comic series stories */
  stardateFrom?: number;
  /** @description Ending stardate of comic series stories */
  stardateTo?: number;
  /** @description Starting year of comic series stories */
  yearFrom?: number;
  /** @description Ending year of comic series stories */
  yearTo?: number;
  /** @description Whether it's a miniseries */
  miniseries?: boolean;
  /** @description Whether it's a photonovel series */
  photonovelSeries?: boolean;
  /** @description Comic series this comic series is included in */
  parentSeries?: ComicSeriesBase[];
  /** @description Child comic series included in this comic series */
  childSeries?: ComicSeriesBase[];
  /** @description Companies that published this comic series */
  publishers?: CompanyBase[];
  /** @description Comics included in this comic series */
  comics?: ComicsBase[];
};

export type ComicSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of comic series matching given criteria */
  comicSeries?: ComicSeriesBase[];
};

export type ComicSeriesFullResponse = {
  comicSeries?: ComicSeriesFull;
};

export type ComicStripHeader = {
  /** @description Comic strip unique ID */
  uid: string;
  /** @description Comic strip title */
  title: string;
};

export type ComicStripBase = {
  /** @description Comic strip unique ID */
  uid: string;
  /** @description Comic strip title */
  title: string;
  /** @description Title of the periodical the comic strip was published in */
  periodical?: string;
  /** @description Year from which the comic strip was published */
  publishedYearFrom?: number;
  /** @description Month from which the comic strip was published */
  publishedMonthFrom?: number;
  /** @description Day from which the comic strip was published */
  publishedDayFrom?: number;
  /** @description Year to which the comic strip was published */
  publishedYearTo?: number;
  /** @description Month to which the comic strip was published */
  publishedMonthTo?: number;
  /** @description Day to which the comic strip was published */
  publishedDayTo?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting year of comic strip story */
  yearFrom?: number;
  /** @description Ending year of comic strip story */
  yearTo?: number;
};

export type ComicStripFull = {
  /** @description Comic strip unique ID */
  uid: string;
  /** @description Comic strip title */
  title: string;
  /** @description Title of the periodical the comic strip was published in */
  periodical?: string;
  /** @description Year from which the comic strip was published */
  publishedYearFrom?: number;
  /** @description Month from which the comic strip was published */
  publishedMonthFrom?: number;
  /** @description Day from which the comic strip was published */
  publishedDayFrom?: number;
  /** @description Year to which the comic strip was published */
  publishedYearTo?: number;
  /** @description Month to which the comic strip was published */
  publishedMonthTo?: number;
  /** @description Day to which the comic strip was published */
  publishedDayTo?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Starting year of comic strip stories */
  yearFrom?: number;
  /** @description Ending year of comic strip stories */
  yearTo?: number;
  /** @description Comic series this comic strip is included in */
  comicSeries?: ComicSeriesBase[];
  /** @description Writers involved in the comic strip */
  writers?: StaffBase[];
  /** @description Artists involved in the comic strip */
  artists?: StaffBase[];
  /** @description Characters appearing in the comic strip */
  characters?: CharacterBase[];
};

export type ComicStripBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of comic strips matching given criteria */
  comicStrips?: ComicStripBase[];
};

export type ComicStripFullResponse = {
  comicStrip?: ComicStripFull;
};

export type CompanyBase = {
  /** @description Company unique ID */
  uid: string;
  /** @description Company name */
  name: string;
  /** @description Whether it's a broadcaster */
  broadcaster?: boolean;
  /** @description Whether it's a collectible company */
  collectibleCompany?: boolean;
  /** @description Whether it's a conglomerate */
  conglomerate?: boolean;
  /** @description Whether it's a digital visual effects company */
  digitalVisualEffectsCompany?: boolean;
  /** @description Whether it's a distributor */
  distributor?: boolean;
  /** @description Whether it's a game company */
  gameCompany?: boolean;
  /** @description Whether it's a film equipment company */
  filmEquipmentCompany?: boolean;
  /** @description Whether it's a make-up effects studio */
  makeUpEffectsStudio?: boolean;
  /** @description Whether it's a matte painting company */
  mattePaintingCompany?: boolean;
  /** @description Whether it's a model and miniature effects company */
  modelAndMiniatureEffectsCompany?: boolean;
  /** @description Whether it's a post-production company */
  postProductionCompany?: boolean;
  /** @description Whether it's a production company */
  productionCompany?: boolean;
  /** @description Whether it's a prop company */
  propCompany?: boolean;
  /** @description Whether it's a record label */
  recordLabel?: boolean;
  /** @description Whether it's a special effects company */
  specialEffectsCompany?: boolean;
  /** @description Whether it's a TV and film production company */
  tvAndFilmProductionCompany?: boolean;
  /** @description Whether it's a video game company */
  videoGameCompany?: boolean;
};

export type CompanyFull = {
  /** @description Company unique ID */
  uid: string;
  /** @description Company name */
  name: string;
  /** @description Whether it's a broadcaster */
  broadcaster?: boolean;
  /** @description Whether it's a collectible company */
  collectibleCompany?: boolean;
  /** @description Whether it's a conglomerate */
  conglomerate?: boolean;
  /** @description Whether it's a digital visual effects company */
  digitalVisualEffectsCompany?: boolean;
  /** @description Whether it's a distributor */
  distributor?: boolean;
  /** @description Whether it's a game company */
  gameCompany?: boolean;
  /** @description Whether it's a film equipment company */
  filmEquipmentCompany?: boolean;
  /** @description Whether it's a make-up effects studio */
  makeUpEffectsStudio?: boolean;
  /** @description Whether it's a matte painting company */
  mattePaintingCompany?: boolean;
  /** @description Whether it's a model and miniature effects company */
  modelAndMiniatureEffectsCompany?: boolean;
  /** @description Whether it's a post-production company */
  postProductionCompany?: boolean;
  /** @description Whether it's a production company */
  productionCompany?: boolean;
  /** @description Whether it's a prop company */
  propCompany?: boolean;
  /** @description Whether it's a record label */
  recordLabel?: boolean;
  /** @description Whether it's a special effects company */
  specialEffectsCompany?: boolean;
  /** @description Whether it's a TV and film production company */
  tvAndFilmProductionCompany?: boolean;
  /** @description Whether it's a video game company */
  videoGameCompany?: boolean;
};

export type CompanyHeader = {
  /** @description Company unique ID */
  uid: string;
  /** @description Company title */
  name: string;
};

export type CompanyBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of companies matching given criteria */
  companies?: CompanyBase[];
};

export type CompanyFullResponse = {
  company?: CompanyFull;
};

export type ConflictBase = {
  /** @description Conflict unique ID */
  uid: string;
  /** @description Conflict name */
  name: string;
  /** @description Starting year of the conflict */
  yearFrom?: number;
  /** @description Ending year of the conflict */
  yearTo?: number;
  /** @description Whether it was an Earth conflict */
  earthConflict?: boolean;
  /** @description Whether this conflict is part of war involving Federation */
  federationWar?: boolean;
  /** @description Whether this conflict is part of war involving the Klingons */
  klingonWar?: boolean;
  /** @description Whether this conflict is a Dominion war battle */
  dominionWarBattle?: boolean;
  /** @description Whether this conflict is from alternate reality */
  alternateReality?: boolean;
};

export type ConflictFull = {
  /** @description Conflict unique ID */
  uid: string;
  /** @description Conflict name */
  name: string;
  /** @description Starting year of the conflict */
  yearFrom?: number;
  /** @description Ending year of the conflict */
  yearTo?: number;
  /** @description Whether it is an Earth conflict */
  earthConflict?: boolean;
  /** @description Whether this conflict is a part of war involving Federation */
  federationWar?: boolean;
  /** @description Whether this conflict is a part of war involving the Klingons */
  klingonWar?: boolean;
  /** @description Whether this conflict is a Dominion war battle */
  dominionWarBattle?: boolean;
  /** @description Whether this conflict is from alternate reality */
  alternateReality?: boolean;
  /** @description Locations this conflict occurred at */
  locations?: LocationBase[];
  /** @description Organization involved in conflict on first side */
  firstSideBelligerents?: OrganizationBase[];
  /** @description Commanders involved in conflict on first side */
  firstSideCommanders?: CharacterBase[];
  /** @description Organization involved in conflict on second side */
  secondSideBelligerents?: OrganizationBase[];
  /** @description Commanders involved in conflict on second side */
  secondSideCommanders?: CharacterBase[];
};

export type ConflictHeader = {
  /** @description Conflict unique ID */
  uid: string;
  /** @description Conflict name */
  name: string;
};

export type ConflictBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of conflicts matching given criteria */
  conflicts?: ConflictBase[];
};

export type ConflictFullResponse = {
  conflict?: ConflictFull;
};

export type ContentLanguage = {
  /** @description Language unique ID */
  uid?: string;
  /** @description Language name */
  name?: string;
  /** @description ISO 639-1 code */
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
  /** @description Rating unique ID */
  uid?: string;
  contentRatingSystem?: ContentRatingSystem;
  /** @description Rating within specified content rating system */
  rating?: string;
};

export type Country = {
  /** @description Country unique ID */
  uid?: string;
  /** @description Country name */
  name?: string;
  /** @description ISO 3166-1 alpha-2 code */
  iso31661Alpha2Code?: string;
};

export type ElementHeader = {
  /** @description Element unique ID */
  uid: string;
  /** @description Element name */
  name: string;
};

export type ElementBase = {
  /** @description Element unique ID */
  uid: string;
  /** @description Element name */
  name: string;
  /** @description Element symbol */
  symbolObject?: string;
  /** @description Element atomic number */
  atomicNumber?: number;
  /** @description Element atomic weight */
  atomicWeight?: number;
  /** @description Whether it's a transuranium */
  transuranium?: boolean;
  /** @description Whether it belongs to Gamma series */
  gammaSeries?: boolean;
  /** @description Whether it belongs to Hypersonic series */
  hypersonicSeries?: boolean;
  /** @description Whether it belongs to Mega series */
  megaSeries?: boolean;
  /** @description Whether it belongs to Omega series */
  omegaSeries?: boolean;
  /** @description Whether it belongs to Transonic series */
  transonicSeries?: boolean;
  /** @description Whether it belongs to World series */
  worldSeries?: boolean;
};

export type ElementFull = {
  /** @description Element unique ID */
  uid: string;
  /** @description Element name */
  name: string;
  /** @description Element symbol */
  symbolObject?: string;
  /** @description Element atomic number */
  atomicNumber?: number;
  /** @description Element atomic weight */
  atomicWeight?: number;
  /** @description Whether it's a transuranium */
  transuranium?: boolean;
  /** @description Whether it belongs to Gamma series */
  gammaSeries?: boolean;
  /** @description Whether it belongs to Hypersonic series */
  hypersonicSeries?: boolean;
  /** @description Whether it belongs to Mega series */
  megaSeries?: boolean;
  /** @description Whether it belongs to Omega series */
  omegaSeries?: boolean;
  /** @description Whether it belongs to Transonic series */
  transonicSeries?: boolean;
  /** @description Whether it belongs to World series */
  worldSeries?: boolean;
};

export type ElementBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of elements matching given criteria */
  elements?: ElementBase[];
};

export type ElementFullResponse = {
  element?: ElementFull;
};

export type EpisodeHeader = {
  /** @description Episode unique ID */
  uid: string;
  /** @description Episode title */
  title: string;
};

export type EpisodeBase = {
  /** @description Episode unique ID */
  uid: string;
  /** @description Episode title */
  title: string;
  /** @description Episode title in German */
  titleGerman?: string;
  /** @description Episode title in Italian */
  titleItalian?: string;
  /** @description Episode title in Japanese */
  titleJapanese?: string;
  series?: SeriesHeader;
  season?: SeasonHeader;
  /** @description Season number */
  seasonNumber?: number;
  /** @description Episode number in season */
  episodeNumber?: number;
  /** @description Production serial number */
  productionSerialNumber?: string;
  /** @description Whether it's a feature length episode */
  featureLength?: boolean;
  /** @description Starting stardate of episode story */
  stardateFrom?: number;
  /** @description Ending stardate of episode story */
  stardateTo?: number;
  /** @description Starting year of episode story */
  yearFrom?: number;
  /** @description Ending year of episode story */
  yearTo?: number;
  /** @description Date the episode was first aired in the United States */
  usAirDate?: string;
  /** @description Date the episode script was completed */
  finalScriptDate?: string;
};

export type EpisodeFull = {
  /** @description Episode unique ID */
  uid: string;
  /** @description Episode title */
  title: string;
  /** @description Episode title in German */
  titleGerman?: string;
  /** @description Episode title in Italian */
  titleItalian?: string;
  /** @description Episode title in Japanese */
  titleJapanese?: string;
  series?: SeriesBase;
  season?: SeasonBase;
  /** @description Season number */
  seasonNumber?: number;
  /** @description Episode number in season */
  episodeNumber?: number;
  /** @description Production serial number */
  productionSerialNumber?: string;
  /** @description Whether it's a feature length episode */
  featureLength?: boolean;
  /** @description Starting stardate of episode story */
  stardateFrom?: number;
  /** @description Ending stardate of episode story */
  stardateTo?: number;
  /** @description Starting year of episode story */
  yearFrom?: number;
  /** @description Ending year of episode story */
  yearTo?: number;
  /** @description Date the episode was first aired in the United States */
  usAirDate?: string;
  /** @description Date the episode script was completed */
  finalScriptDate?: string;
  /** @description Writers involved in the episode */
  writers?: StaffBase[];
  /** @description Teleplay authors involved in the episode */
  teleplayAuthors?: StaffBase[];
  /** @description Story authors involved in the episode */
  storyAuthors?: StaffBase[];
  /** @description Directors authors involved in the episode */
  directors?: StaffBase[];
  /** @description Performers appearing in the episode */
  performers?: PerformerBase[];
  /** @description Stunt performers appearing in the episode */
  stuntPerformers?: PerformerBase[];
  /** @description Stand-in performers appearing in the episode */
  standInPerformers?: PerformerBase[];
  /** @description Characters appearing in the episode */
  characters?: CharacterBase[];
};

export type EpisodeBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of episodes matching given criteria */
  episodes?: EpisodeBase[];
};

export type EpisodeFullResponse = {
  episode?: EpisodeFull;
};

export type Error = {
  /** @description Error code */
  code?: string;
  /** @description Error message */
  message?: string;
};

export type FoodHeader = {
  /** @description Food unique ID */
  uid: string;
  /** @description Food name */
  name: string;
};

export type FoodBase = {
  /** @description Food unique ID */
  uid: string;
  /** @description Food name */
  name: string;
  /** @description Whether it's of earthly origin */
  earthlyOrigin?: boolean;
  /** @description Whether it's a dessert */
  dessert?: boolean;
  /** @description Whether it's a fruit */
  fruit?: boolean;
  /** @description Whether it's a herb or a spice */
  herbOrSpice?: boolean;
  /** @description Whether it's a sauce */
  sauce?: boolean;
  /** @description Whether it's a soup */
  soup?: boolean;
  /** @description Whether it's a beverage */
  beverage?: boolean;
  /** @description Whether it's an alcoholic beverage */
  alcoholicBeverage?: boolean;
  /** @description Whether it's a juice */
  juice?: boolean;
  /** @description Whether it's a tea */
  tea?: boolean;
};

export type FoodFull = {
  /** @description Food unique ID */
  uid: string;
  /** @description Food name */
  name: string;
  /** @description Whether it's of earthly origin */
  earthlyOrigin?: boolean;
  /** @description Whether it's a dessert */
  dessert?: boolean;
  /** @description Whether it's a fruit */
  fruit?: boolean;
  /** @description Whether it's an herb or a spice */
  herbOrSpice?: boolean;
  /** @description Whether it's a sauce */
  sauce?: boolean;
  /** @description Whether it's a soup */
  soup?: boolean;
  /** @description Whether it's a beverage */
  beverage?: boolean;
  /** @description Whether it's an alcoholic beverage */
  alcoholicBeverage?: boolean;
  /** @description Whether it's a juice */
  juice?: boolean;
  /** @description Whether it's a tea */
  tea?: boolean;
};

export type FoodBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of foods matching given criteria */
  foods?: FoodBase[];
};

export type FoodFullResponse = {
  food?: FoodFull;
};

export type Gender = "F" | "M";

export type Genre = {
  /** @description Genre unique ID */
  uid?: string;
  /** @description Genre name */
  name?: string;
};

export type LiteratureHeader = {
  /** @description Literature unique ID */
  uid: string;
  /** @description Literature title */
  title: string;
};

export type LiteratureBase = {
  /** @description Literature unique ID */
  uid: string;
  /** @description Literature title */
  title: string;
  /** @description Whether it's of earthly origin */
  earthlyOrigin?: boolean;
  /** @description Whether it's a Shakespearean work */
  shakespeareanWork?: boolean;
  /** @description Whether it's a report */
  report?: boolean;
  /** @description Whether it's a scientific literature */
  scientificLiterature?: boolean;
  /** @description Whether it's a technical manual */
  technicalManual?: boolean;
  /** @description Whether it's a religious literature */
  religiousLiterature?: boolean;
};

export type LiteratureFull = {
  /** @description Literature unique ID */
  uid: string;
  /** @description Literature title */
  title: string;
  /** @description Whether it's of earthly origin */
  earthlyOrigin?: boolean;
  /** @description Whether it's a Shakespearean work */
  shakespeareanWork?: boolean;
  /** @description Whether it's a report */
  report?: boolean;
  /** @description Whether it's a scientific literature */
  scientificLiterature?: boolean;
  /** @description Whether it's a technical manual */
  technicalManual?: boolean;
  /** @description Whether it's a religious literature */
  religiousLiterature?: boolean;
};

export type LiteratureBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of literature matching given criteria */
  literature?: LiteratureBase[];
};

export type LiteratureFullResponse = {
  literature?: LiteratureFull;
};

export type LocationHeader = {
  /** @description Location unique ID */
  uid: string;
  /** @description Location name */
  name: string;
};

export type LocationBase = {
  /** @description Location unique ID */
  uid: string;
  /** @description Location name */
  name: string;
  /** @description Whether it's an earthly location */
  earthlyLocation?: boolean;
  /** @description Whether it's a fictional location */
  fictionalLocation?: boolean;
  /** @description Whether it's a religious location */
  religiousLocation?: boolean;
  /** @description Whether it's a geographical location */
  geographicalLocation?: boolean;
  /** @description Whether it's a body of water */
  bodyOfWater?: boolean;
  /** @description Whether it's a country */
  country?: boolean;
  /** @description Whether it's a subnational entity */
  subnationalEntity?: boolean;
  /** @description Whether it's a settlement */
  settlement?: boolean;
  /** @description Whether it's a US settlement */
  usSettlement?: boolean;
  /** @description Whether it's a Bajoran settlement */
  bajoranSettlement?: boolean;
  /** @description Whether it's a colony */
  colony?: boolean;
  /** @description Whether it's a landform */
  landform?: boolean;
  /** @description Whether it's a landmark */
  landmark?: boolean;
  /** @description Whether it's a road */
  road?: boolean;
  /** @description Whether it's a structure */
  structure?: boolean;
  /** @description Whether it's a shipyard */
  shipyard?: boolean;
  /** @description Whether it's a building interior */
  buildingInterior?: boolean;
  /** @description Whether it's a establishment */
  establishment?: boolean;
  /** @description Whether it's a medical establishment */
  medicalEstablishment?: boolean;
  /** @description Whether it's a DS9 establishment */
  ds9Establishment?: boolean;
  /** @description Whether it's a school */
  school?: boolean;
  /** @description Whether this location is from mirror universe */
  mirror?: boolean;
  /** @description Whether this location is from alternate reality */
  alternateReality?: boolean;
};

export type LocationFull = {
  /** @description Location unique ID */
  uid: string;
  /** @description Location name */
  name: string;
  /** @description Whether it's an earthly location */
  earthlyLocation?: boolean;
  /** @description Whether it's a fictional location */
  fictionalLocation?: boolean;
  /** @description Whether it's a religious location */
  religiousLocation?: boolean;
  /** @description Whether it's a geographical location */
  geographicalLocation?: boolean;
  /** @description Whether it's a body of water */
  bodyOfWater?: boolean;
  /** @description Whether it's a country */
  country?: boolean;
  /** @description Whether it's a subnational entity */
  subnationalEntity?: boolean;
  /** @description Whether it's a settlement */
  settlement?: boolean;
  /** @description Whether it's a US settlement */
  usSettlement?: boolean;
  /** @description Whether it's a Bajoran settlement */
  bajoranSettlement?: boolean;
  /** @description Whether it's a colony */
  colony?: boolean;
  /** @description Whether it's a landform */
  landform?: boolean;
  /** @description Whether it's a landmark */
  landmark?: boolean;
  /** @description Whether it's a road */
  road?: boolean;
  /** @description Whether it's a structure */
  structure?: boolean;
  /** @description Whether it's a shipyard */
  shipyard?: boolean;
  /** @description Whether it's a building interior */
  buildingInterior?: boolean;
  /** @description Whether it's a establishment */
  establishment?: boolean;
  /** @description Whether it's a medical establishment */
  medicalEstablishment?: boolean;
  /** @description Whether it's a DS9 establishment */
  ds9Establishment?: boolean;
  /** @description Whether it's a school */
  school?: boolean;
  /** @description Whether this location is from mirror universe */
  mirror?: boolean;
  /** @description Whether this location is from alternate reality */
  alternateReality?: boolean;
};

export type LocationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of locations matching given criteria */
  locations?: LocationBase[];
};

export type LocationFullResponse = {
  location?: LocationFull;
};

export type MagazineHeader = {
  /** @description Magazine unique ID */
  uid: string;
  /** @description Magazine title */
  title: string;
};

export type MagazineBase = {
  /** @description Magazine unique ID */
  uid: string;
  /** @description Magazine title */
  title: string;
  /** @description Year the magazine was published */
  publishedYear?: number;
  /** @description Month the magazine was published */
  publishedMonth?: number;
  /** @description Day the magazine was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Magazine issue number */
  issueNumber?: string;
};

export type MagazineFull = {
  /** @description Magazine unique ID */
  uid: string;
  /** @description Magazine title */
  title: string;
  /** @description Year the magazine was published */
  publishedYear?: number;
  /** @description Month the magazine was published */
  publishedMonth?: number;
  /** @description Day the magazine was published */
  publishedDay?: number;
  /** @description Cover publication year */
  coverYear?: number;
  /** @description Cover publication month */
  coverMonth?: number;
  /** @description Cover publication day */
  coverDay?: number;
  /** @description Number of pages */
  numberOfPages?: number;
  /** @description Magazine issue number */
  issueNumber?: string;
  /** @description Magazine series this magazine is included in */
  magazineSeries?: MagazineSeriesBase[];
  /** @description Editors involved in the magazine */
  editors?: StaffBase[];
  /** @description Magazine publishers */
  publishers?: CompanyBase[];
};

export type MagazineBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of magazines matching given criteria */
  magazines?: MagazineBase[];
};

export type MagazineFullResponse = {
  magazine?: MagazineFull;
};

export type MagazineSeriesHeader = {
  /** @description Magazine series unique ID */
  uid: string;
  /** @description Magazine series title */
  title: string;
};

export type MagazineSeriesBase = {
  /** @description Magazine series unique ID */
  uid: string;
  /** @description Magazine series title */
  title: string;
  /** @description Year from which the magazine series was published */
  publishedYearFrom?: number;
  /** @description Month from which the magazine series was published */
  publishedMonthFrom?: number;
  /** @description Year to which the magazine series was published */
  publishedYearTo?: number;
  /** @description Month to which the magazine series was published */
  publishedMonthTo?: number;
  /** @description Number of issues */
  numberOfIssues?: number;
};

export type MagazineSeriesFull = {
  /** @description Magazine series unique ID */
  uid: string;
  /** @description Magazine series title */
  title: string;
  /** @description Year from which the magazine series was published */
  publishedYearFrom?: number;
  /** @description Month from which the magazine series was published */
  publishedMonthFrom?: number;
  /** @description Year to which the magazine series was published */
  publishedYearTo?: number;
  /** @description Month to which the magazine series was published */
  publishedMonthTo?: number;
  /** @description Number of issues */
  numberOfIssues?: number;
  /** @description Companies that published this magazine series */
  publishers?: CompanyBase[];
  /** @description Editors involved in the magazine series */
  editors?: StaffBase[];
  /** @description Magazines included in this magazine series */
  magazines?: MagazineBase[];
};

export type MagazineSeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of magazine series matching given criteria */
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
  /** @description Material unique ID */
  uid: string;
  /** @description Material name */
  name: string;
};

export type MaterialBase = {
  /** @description Material unique ID */
  uid: string;
  /** @description Material name */
  name: string;
  /** @description Whether it's a chemical compound */
  chemicalCompound?: boolean;
  /** @description Whether it's a biochemical compound */
  biochemicalCompound?: boolean;
  /** @description Whether it's a drug */
  drug?: boolean;
  /** @description Whether it's a poisonous substance */
  poisonousSubstance?: boolean;
  /** @description Whether it's an explosive */
  explosive?: boolean;
  /** @description Whether it's a gemstone */
  gemstone?: boolean;
  /** @description Whether it's an alloy or a composite */
  alloyOrComposite?: boolean;
  /** @description Whether it's a fuel */
  fuel?: boolean;
  /** @description Whether it's a mineral */
  mineral?: boolean;
  /** @description Whether it's a precious material */
  preciousMaterial?: boolean;
};

export type MaterialFull = {
  /** @description Material unique ID */
  uid: string;
  /** @description Material name */
  name: string;
  /** @description Whether it's a chemical compound */
  chemicalCompound?: boolean;
  /** @description Whether it's a biochemical compound */
  biochemicalCompound?: boolean;
  /** @description Whether it's a drug */
  drug?: boolean;
  /** @description Whether it's a poisonous substance */
  poisonousSubstance?: boolean;
  /** @description Whether it's an explosive */
  explosive?: boolean;
  /** @description Whether it's a gemstone */
  gemstone?: boolean;
  /** @description Whether it's an alloy or a composite */
  alloyOrComposite?: boolean;
  /** @description Whether it's a fuel */
  fuel?: boolean;
  /** @description Whether it's a mineral */
  mineral?: boolean;
  /** @description Whether it's a precious material */
  preciousMaterial?: boolean;
};

export type MaterialBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of materials matching given criteria */
  materials?: MaterialBase[];
};

export type MaterialFullResponse = {
  material?: MaterialFull;
};

export type MedicalConditionHeader = {
  /** @description Medical condition unique ID */
  uid: string;
  /** @description Medical condition name */
  name: string;
};

export type MedicalConditionBase = {
  /** @description Medical condition unique ID */
  uid: string;
  /** @description Medical condition name */
  name: string;
  /** @description Whether it's a psychological condition */
  psychologicalCondition?: boolean;
};

export type MedicalConditionFull = {
  /** @description Medical condition unique ID */
  uid: string;
  /** @description Medical condition name */
  name: string;
  /** @description Whether it's a psychological condition */
  psychologicalCondition?: boolean;
};

export type MedicalConditionBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of medical conditions matching given criteria */
  medicalConditions?: MedicalConditionBase[];
};

export type MedicalConditionFullResponse = {
  medicalCondition?: MedicalConditionFull;
};

export type MovieHeader = {
  /** @description Movie unique ID */
  uid: string;
  /** @description Movie title */
  title: string;
};

export type MovieBase = {
  /** @description Movie unique ID */
  uid: string;
  /** @description Movie title */
  title: string;
  mainDirector?: StaffHeader;
  /** @description Movie title in Bulgarian */
  titleBulgarian?: string;
  /** @description Movie title in Catalan */
  titleCatalan?: string;
  /** @description Movie title in Chinese traditional */
  titleChineseTraditional?: string;
  /** @description Movie title in German */
  titleGerman?: string;
  /** @description Movie title in Italian */
  titleItalian?: string;
  /** @description Movie title in Japanese */
  titleJapanese?: string;
  /** @description Movie title in Polish */
  titlePolish?: string;
  /** @description Movie title in Russian */
  titleRussian?: string;
  /** @description Movie title in Serbian */
  titleSerbian?: string;
  /** @description Movie title in Spanish */
  titleSpanish?: string;
  /** @description Starting stardate of movie story */
  stardateFrom?: number;
  /** @description Ending stardate of movie story */
  stardateTo?: number;
  /** @description Starting year of movie story */
  yearFrom?: number;
  /** @description Ending year of movie story */
  yearTo?: number;
  /** @description Date the movie was first released in the United States */
  usReleaseDate?: string;
};

export type MovieFull = {
  /** @description Movie unique ID */
  uid: string;
  /** @description Movie title */
  title: string;
  mainDirector?: StaffBase;
  /** @description Movie title in Bulgarian */
  titleBulgarian?: string;
  /** @description Movie title in Catalan */
  titleCatalan?: string;
  /** @description Movie title in Chinese traditional */
  titleChineseTraditional?: string;
  /** @description Movie title in German */
  titleGerman?: string;
  /** @description Movie title in Italian */
  titleItalian?: string;
  /** @description Movie title in Japanese */
  titleJapanese?: string;
  /** @description Movie title in Polish */
  titlePolish?: string;
  /** @description Movie title in Russian */
  titleRussian?: string;
  /** @description Movie title in Serbian */
  titleSerbian?: string;
  /** @description Movie title in Spanish */
  titleSpanish?: string;
  /** @description Starting stardate of movie story */
  stardateFrom?: number;
  /** @description Ending stardate of movie story */
  stardateTo?: number;
  /** @description Starting year of movie story */
  yearFrom?: number;
  /** @description Ending year of movie story */
  yearTo?: number;
  /** @description Date the movie was first released in the United States */
  usReleaseDate?: string;
  /** @description Writers involved in the movie */
  writers?: StaffBase[];
  /** @description Screenplay authors involved in the movie */
  screenplayAuthors?: StaffBase[];
  /** @description Story authors authors involved in the movie */
  storyAuthors?: StaffBase[];
  /** @description Directors authors involved in the movie */
  directors?: StaffBase[];
  /** @description Producers authors involved in the movie */
  producers?: StaffBase[];
  /** @description Other staff involved in the movie */
  staff?: StaffBase[];
  /** @description Performers appearing in the movie */
  performers?: PerformerBase[];
  /** @description Stunt performers appearing in the movie */
  stuntPerformers?: PerformerBase[];
  /** @description Stand-in performers appearing in the movie */
  standInPerformers?: PerformerBase[];
  /** @description Characters appearing in the movie */
  characters?: CharacterBase[];
};

export type MovieBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of movies matching given criteria */
  movies?: MovieBase[];
};

export type MovieFullResponse = {
  movie?: MovieFull;
};

export type OccupationHeader = {
  /** @description Occupation unique ID */
  uid: string;
  /** @description Occupation name */
  name: string;
};

export type OccupationBase = {
  /** @description Occupation unique ID */
  uid: string;
  /** @description Occupation name */
  name: string;
  /** @description Whether it's a legal occupation */
  legalOccupation?: boolean;
  /** @description Whether it's a medical occupation */
  medicalOccupation?: boolean;
  /** @description Whether it's a scientific occupation */
  scientificOccupation?: boolean;
};

export type OccupationFull = {
  /** @description Occupation unique ID */
  uid: string;
  /** @description Occupation name */
  name: string;
  /** @description Whether it's a legal occupation */
  legalOccupation?: boolean;
  /** @description Whether it's a medical occupation */
  medicalOccupation?: boolean;
  /** @description Whether it's a scientific occupation */
  scientificOccupation?: boolean;
  /** @description Characters with this occupation */
  characters?: CharacterBase[];
};

export type OccupationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of occupations matching given criteria */
  occupations?: OccupationBase[];
};

export type OccupationFullResponse = {
  occupation?: OccupationFull;
};

export type OrganizationHeader = {
  /** @description Organization unique ID */
  uid: string;
  /** @description Organization name */
  name: string;
};

export type OrganizationBase = {
  /** @description Organization unique ID */
  uid: string;
  /** @description Organization name */
  name: string;
  /** @description Whether it's a government */
  government?: boolean;
  /** @description Whether it's an intergovernmental organization */
  intergovernmentalOrganization?: boolean;
  /** @description Whether it's a research organization */
  researchOrganization?: boolean;
  /** @description Whether it's a sport organization */
  sportOrganization?: boolean;
  /** @description Whether it's a medical organization */
  medicalOrganization?: boolean;
  /** @description Whether it's a military organization */
  militaryOrganization?: boolean;
  /** @description Whether it's a military unit */
  militaryUnit?: boolean;
  /** @description Whether it's a government agency */
  governmentAgency?: boolean;
  /** @description Whether it's a law enforcement agency */
  lawEnforcementAgency?: boolean;
  /** @description Whether it's a prison or penal colony */
  prisonOrPenalColony?: boolean;
  /** @description Whether this organization is from mirror universe */
  mirror?: boolean;
  /** @description Whether this location is from alternate reality */
  alternateReality?: boolean;
};

export type OrganizationFull = {
  /** @description Organization unique ID */
  uid: string;
  /** @description Organization name */
  name: string;
  /** @description Whether it's a government */
  government?: boolean;
  /** @description Whether it's an intergovernmental organization */
  intergovernmentalOrganization?: boolean;
  /** @description Whether it's a research organization */
  researchOrganization?: boolean;
  /** @description Whether it's a sport organization */
  sportOrganization?: boolean;
  /** @description Whether it's a medical organization */
  medicalOrganization?: boolean;
  /** @description Whether it's a military organization */
  militaryOrganization?: boolean;
  /** @description Whether it's a military unit */
  militaryUnit?: boolean;
  /** @description Whether it's a government agency */
  governmentAgency?: boolean;
  /** @description Whether it's a law enforcement agency */
  lawEnforcementAgency?: boolean;
  /** @description Whether it's a prison or penal colony */
  prisonOrPenalColony?: boolean;
  /** @description Whether this organization is from mirror universe */
  mirror?: boolean;
  /** @description Whether this organization is from alternate reality */
  alternateReality?: boolean;
  /** @description Characters belonging to this organization */
  characters?: CharacterBase[];
};

export type OrganizationBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of organizations matching given criteria */
  organizations?: OrganizationBase[];
};

export type OrganizationFullResponse = {
  organization?: OrganizationFull;
};

export type PerformerHeader = {
  /** @description Performer unique ID */
  uid: string;
  /** @description Performer name */
  name: string;
};

export type PerformerBase = {
  /** @description Performer unique ID */
  uid: string;
  /** @description Performer name */
  name: string;
  /** @description Performer birth name */
  birthName?: string;
  gender?: Gender;
  /** @description Date the performer was born */
  dateOfBirth?: string;
  /** @description Place the performer was born */
  placeOfBirth?: string;
  /** @description Date the performer died */
  dateOfDeath?: string;
  /** @description Place the performer died */
  placeOfDeath?: string;
  /** @description Whether it's an animal performer */
  animalPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Discovery */
  disPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Deep Space Nine */
  ds9Performer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Enterprise */
  entPerformer?: boolean;
  /** @description Whether it's a performer that appeared in a Star Trek movie */
  filmPerformer?: boolean;
  /** @description Whether it's a stand-in performer */
  standInPerformer?: boolean;
  /** @description Whether it's a stunt performer */
  stuntPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Animated Series */
  tasPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Next Generation */
  tngPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Original Series */
  tosPerformer?: boolean;
  /** @description Whether it's a video game performer */
  videoGamePerformer?: boolean;
  /** @description Whether it's a voice performer */
  voicePerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Voyager */
  voyPerformer?: boolean;
};

export type PerformerFull = {
  /** @description Performer unique ID */
  uid: string;
  /** @description Performer name */
  name: string;
  /** @description Performer birth name */
  birthName?: string;
  gender?: Gender;
  /** @description Date the performer was born */
  dateOfBirth?: string;
  /** @description Place the performer was born */
  placeOfBirth?: string;
  /** @description Date the performer died */
  dateOfDeath?: string;
  /** @description Place the performer died */
  placeOfDeath?: string;
  /** @description Whether it's an animal performer */
  animalPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Discovery */
  disPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Deep Space Nine */
  ds9Performer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Enterprise */
  entPerformer?: boolean;
  /** @description Whether it's a performer that appeared in a Star Trek movie */
  filmPerformer?: boolean;
  /** @description Whether it's a stand-in performer */
  standInPerformer?: boolean;
  /** @description Whether it's a stunt performer */
  stuntPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Animated Series */
  tasPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Next Generation */
  tngPerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: The Original Series */
  tosPerformer?: boolean;
  /** @description Whether it's a video game performer */
  videoGamePerformer?: boolean;
  /** @description Whether it's a voice performer */
  voicePerformer?: boolean;
  /** @description Whether it's a performer that appeared in Star Trek: Voyager */
  voyPerformer?: boolean;
  /** @description Episodes in which this person appeared as a performer */
  episodesPerformances?: EpisodeBase[];
  /** @description Episodes in which this person appeared as a stunt performer */
  episodesStuntPerformances?: EpisodeBase[];
  /** @description Episodes in which this person appeared as a stand-in performer */
  episodesStandInPerformances?: EpisodeBase[];
  /** @description Movies in which this person appeared as a performer */
  moviesPerformances?: MovieBase[];
  /** @description Movies in which this person appeared as a stunt performer */
  moviesStuntPerformances?: MovieBase[];
  /** @description Movies in which this person appeared as a stand-in performer */
  moviesStandInPerformances?: MovieBase[];
  /** @description Characters played by this performer */
  characters?: CharacterBase[];
};

export type PerformerBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of performers matching given criteria */
  performers?: PerformerBase[];
};

export type PerformerFullResponse = {
  performer?: PerformerFull;
};

export type Platform = {
  /** @description Platform unique ID */
  uid?: string;
  /** @description Platform name */
  name?: string;
};

export type ProductionRunUnit = "BOX" | "SET";

export type Reference = {
  /** @description Reference unique ID */
  uid?: string;
  referenceType?: ReferenceType;
  /** @description Reference number */
  referenceNumber?: string;
};

export type ReferenceType = "ASIN" | "ISBN";

export type ResponsePage = {
  /** @description Zero-based page number */
  pageNumber?: number;
  /** @description Page size */
  pageSize?: number;
  /** @description Number of elements in page */
  numberOfElements?: number;
  /** @description Total elements found */
  totalElements?: number;
  /** @description Total pages found */
  totalPages?: number;
  /** @description Whether it is the first page */
  firstPage?: boolean;
  /** @description Whether it is the last page */
  lastPage?: boolean;
};

export type ResponseSort = {
  /** @description List of response sort rules */
  clauses?: ResponseSortClause[];
};

export type ResponseSortClause = {
  /** @description Field name results are sorted by */
  name: string;
  direction?: ResponseSortDirection;
  /** @description Order in which this clause was applied */
  clauseOrder: number;
};

export type ResponseSortDirection = "ASC" | "DESC";

export type SeasonHeader = {
  /** @description Season unique ID */
  uid: string;
  /** @description Season title */
  title: string;
};

export type SeasonBase = {
  /** @description Season unique ID */
  uid: string;
  /** @description Season title */
  title: string;
  series?: SeriesHeader;
  /** @description Season number in series */
  seasonNumber?: number;
  /** @description Number of episodes in this season */
  numberOfEpisodes?: number;
};

export type SeasonFull = {
  /** @description Season unique ID */
  uid: string;
  /** @description Season title */
  title: string;
  series?: SeriesBase;
  /** @description Season number in series */
  seasonNumber?: number;
  /** @description Number of episodes in this season */
  numberOfEpisodes?: number;
  /** @description Episodes in this season */
  episodes?: EpisodeBase[];
};

export type SeasonBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of seasons matching given criteria */
  seasons?: SeasonBase[];
};

export type SeasonFullResponse = {
  season?: SeasonFull;
};

export type SeriesHeader = {
  /** @description Series unique ID */
  uid: string;
  /** @description Series title */
  title: string;
};

export type SeriesBase = {
  /** @description Series unique ID */
  uid: string;
  /** @description Series title */
  title: string;
  /** @description Series abbreviation */
  abbreviation: string;
  /** @description Year the series production started */
  productionStartYear?: number;
  /** @description Year the series production ended */
  productionEndYear?: number;
  /** @description Date the series originally ran from */
  originalRunStartDate?: string;
  /** @description Date the series originally ran to */
  originalRunEndDate?: string;
  /** @description Number of seasons */
  seasonsCount?: number;
  /** @description Number of episodes */
  episodesCount?: number;
  /** @description Number of feature length episodes */
  featureLengthEpisodesCount?: number;
  productionCompany?: CompanyHeader;
  originalBroadcaster?: CompanyHeader;
};

export type SeriesFull = {
  /** @description Series unique ID */
  uid: string;
  /** @description Series title */
  title: string;
  /** @description Series abbreviation */
  abbreviation: string;
  /** @description Year the series production started */
  productionStartYear?: number;
  /** @description Year the series production ended */
  productionEndYear?: number;
  /** @description Date the series originally ran from */
  originalRunStartDate?: string;
  /** @description Date the series originally ran to */
  originalRunEndDate?: string;
  /** @description Number of seasons */
  seasonsCount?: number;
  /** @description Number of episodes */
  episodesCount?: number;
  /** @description Number of feature length episodes */
  featureLengthEpisodesCount?: number;
  productionCompany?: CompanyBase;
  originalBroadcaster?: CompanyBase;
  /** @description Episodes in the series */
  episodes?: EpisodeBase[];
  /** @description Seasons in the series */
  seasons?: SeasonBase[];
};

export type SeriesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of series matching given criteria */
  series?: SeriesBase[];
};

export type SeriesFullResponse = {
  series?: SeriesFull;
};

export type SoundtrackHeader = {
  /** @description Soundtrack unique ID */
  uid: string;
  /** @description Soundtrack title */
  title: string;
};

export type SoundtrackBase = {
  /** @description Soundtrack unique ID */
  uid: string;
  /** @description Soundtrack title */
  title: string;
  /** @description Release date */
  releaseDate?: string;
  /** @description Length, in seconds */
  length?: number;
};

export type SoundtrackFull = {
  /** @description Soundtrack unique ID */
  uid: string;
  /** @description Soundtrack title */
  title: string;
  /** @description Release date */
  releaseDate?: string;
  /** @description Length, in seconds */
  length?: number;
  /** @description Labels this soundtrack was relesed by */
  labels?: CompanyBase[];
  /** @description Composers */
  composers?: StaffBase[];
  /** @description Other musicians that contributed to this soundtrack */
  contributors?: StaffBase[];
  /** @description Orchestrators */
  orchestrators?: StaffBase[];
  /** @description References */
  references?: Reference[];
};

export type SoundtrackBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of soundtracks matching given criteria */
  soundtracks?: SoundtrackBase[];
};

export type SoundtrackFullResponse = {
  soundtrack?: SoundtrackFull;
};

export type SpacecraftHeader = {
  /** @description Spacecraft unique ID */
  uid: string;
  /** @description Spacecraft name */
  name: string;
};

export type SpacecraftBase = {
  /** @description Spacecraft unique ID */
  uid: string;
  /** @description Spacecraft name */
  name: string;
  /** @description Spacecraft registry */
  registry?: string;
  /** @description Status of a spacecraft (in prime reality, if spacecraft was in more than one realities) */
  status?: string;
  /** @description Date the spacecraft status was last known */
  dateStatus?: string;
  spacecraftClass?: SpacecraftClassHeader;
  owner?: OrganizationHeader;
  operator?: OrganizationHeader;
};

export type SpacecraftFull = {
  /** @description Spacecraft unique ID */
  uid: string;
  /** @description Spacecraft name */
  name: string;
  /** @description Spacecraft registry */
  registry?: string;
  /** @description Status of a spacecraft (in prime reality, if spacecraft was in more than one realities) */
  status?: string;
  /** @description Date the spacecraft status was last known */
  dateStatus?: string;
  spacecraftClass?: SpacecraftClassBase;
  owner?: OrganizationBase;
  operator?: OrganizationBase;
  /** @description Spacecraft types */
  spacecraftTypes?: SpacecraftType[];
};

export type SpacecraftBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of spacecrafts matching given criteria */
  spacecrafts?: SpacecraftBase[];
};

export type SpacecraftFullResponse = {
  spacecraft?: SpacecraftFull;
};

export type SpacecraftClassHeader = {
  /** @description Spacecraft class unique ID */
  uid: string;
  /** @description Spacecraft class name */
  name: string;
};

export type SpacecraftClassBase = {
  /** @description Spacecraft class unique ID */
  uid: string;
  /** @description Spacecraft class name */
  name: string;
  /** @description Number of decks */
  numberOfDecks?: number;
  /** @description Whether it's a warp-capable spacecraft class */
  warpCapable?: boolean;
  /** @description Whether this spacecraft class is from alternate reality */
  alternateReality?: boolean;
  /** @description Starting period when this spacecraft class was in use */
  activeFrom?: string;
  /** @description Ending period when this spacecraft class was in use */
  activeTo?: string;
  species?: SpeciesHeader;
  owner?: OrganizationHeader;
  operator?: OrganizationHeader;
  affiliation?: OrganizationHeader;
};

export type SpacecraftClassFull = {
  /** @description Spacecraft class unique ID */
  uid: string;
  /** @description Spacecraft class name */
  name: string;
  /** @description Number of decks */
  numberOfDecks?: number;
  /** @description Whether it's a warp-capable spacecraft class */
  warpCapable?: boolean;
  /** @description Whether this spacecraft class is from alternate reality */
  alternateReality?: boolean;
  /** @description Starting period when this spacecraft class was in use */
  activeFrom?: string;
  /** @description Ending period when this spacecraft class was in use */
  activeTo?: string;
  species?: SpeciesHeader;
  owner?: OrganizationBase;
  operator?: OrganizationBase;
  affiliation?: OrganizationBase;
  /** @description Spacecraft types */
  spacecraftTypes?: SpacecraftType[];
  /** @description Spacecrafts */
  spacecrafts?: SpacecraftBase[];
};

export type SpacecraftClassBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of spacecraft classes matching given criteria */
  spacecraftClasses?: SpacecraftClassBase[];
};

export type SpacecraftClassFullResponse = {
  spacecraftClass?: SpacecraftClassFull;
};

export type SpacecraftType = {
  /** @description Spacecraft type unique ID */
  uid?: string;
  /** @description Spacecraft type name */
  name?: string;
};

export type SpeciesHeader = {
  /** @description Species unique ID */
  uid: string;
  /** @description Species name */
  name: string;
};

export type SpeciesBase = {
  /** @description Species unique ID */
  uid: string;
  /** @description Species name */
  name: string;
  homeworld?: AstronomicalObjectHeader;
  quadrant?: AstronomicalObjectHeader;
  /** @description Whether it's an extinct species */
  extinctSpecies?: boolean;
  /** @description Whether it's a warp-capable species */
  warpCapableSpecies?: boolean;
  /** @description Whether it's an extra-galactic species */
  extraGalacticSpecies?: boolean;
  /** @description Whether it's a humanoid species */
  humanoidSpecies?: boolean;
  /** @description Whether it's a reptilian species */
  reptilianSpecies?: boolean;
  /** @description Whether it's a non-corporeal species */
  nonCorporealSpecies?: boolean;
  /** @description Whether it's a shapeshifting species */
  shapeshiftingSpecies?: boolean;
  /** @description Whether it's a spaceborne species */
  spaceborneSpecies?: boolean;
  /** @description Whether it's a telepathic species */
  telepathicSpecies?: boolean;
  /** @description Whether it's a trans-dimensional species */
  transDimensionalSpecies?: boolean;
  /** @description Whether it's a unnamed species */
  unnamedSpecies?: boolean;
  /** @description Whether this species is from alternate reality */
  alternateReality?: boolean;
};

export type SpeciesFull = {
  /** @description Species unique ID */
  uid: string;
  /** @description Species name */
  name: string;
  homeworld?: AstronomicalObjectBase;
  quadrant?: AstronomicalObjectBase;
  /** @description Whether it's an extinct species */
  extinctSpecies?: boolean;
  /** @description Whether it's a warp-capable species */
  warpCapableSpecies?: boolean;
  /** @description Whether it's an extra-galactic species */
  extraGalacticSpecies?: boolean;
  /** @description Whether it's a humanoid species */
  humanoidSpecies?: boolean;
  /** @description Whether it's a reptilian species */
  reptilianSpecies?: boolean;
  /** @description Whether it's a non-corporeal species */
  nonCorporealSpecies?: boolean;
  /** @description Whether it's a shapeshifting species */
  shapeshiftingSpecies?: boolean;
  /** @description Whether it's a spaceborne species */
  spaceborneSpecies?: boolean;
  /** @description Whether it's a telepathic species */
  telepathicSpecies?: boolean;
  /** @description Whether it's a trans-dimensional species */
  transDimensionalSpecies?: boolean;
  /** @description Whether it's a unnamed species */
  unnamedSpecies?: boolean;
  /** @description Whether this species is from alternate reality */
  alternateReality?: boolean;
  /** @description Characters belonging to the species */
  characters?: CharacterBase[];
};

export type SpeciesBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of species matching given criteria */
  species?: SpeciesBase[];
};

export type SpeciesFullResponse = {
  species?: SpeciesFull;
};

export type StaffHeader = {
  /** @description Staff unique ID */
  uid: string;
  /** @description Staff name */
  name: string;
};

export type StaffBase = {
  /** @description Staff unique ID */
  uid: string;
  /** @description Staff name */
  name: string;
  /** @description Staff birth name */
  birthName?: string;
  gender?: Gender;
  /** @description Date the staff was born */
  dateOfBirth?: string;
  /** @description Place the staff was born */
  placeOfBirth?: string;
  /** @description Date the staff died */
  dateOfDeath?: string;
  /** @description Place the staff died */
  placeOfDeath?: string;
  /** @description Whether this person if from art department */
  artDepartment?: boolean;
  /** @description Whether this person is an art director */
  artDirector?: boolean;
  /** @description Whether this person is a production designer */
  productionDesigner?: boolean;
  /** @description Whether this person is from camera and electrical department */
  cameraAndElectricalDepartment?: boolean;
  /** @description Whether this person is a cinematographer */
  cinematographer?: boolean;
  /** @description Whether this person is from casting department */
  castingDepartment?: boolean;
  /** @description Whether this person is from costume department */
  costumeDepartment?: boolean;
  /** @description Whether this person is a custume designer */
  costumeDesigner?: boolean;
  /** @description Whether this person is a director */
  director?: boolean;
  /** @description Whether this person is an assistant or secound unit director director */
  assistantOrSecondUnitDirector?: boolean;
  /** @description Whether this person is an exhibit and tttraction staff */
  exhibitAndAttractionStaff?: boolean;
  /** @description Whether this person is a film editor */
  filmEditor?: boolean;
  /** @description Whether this person is a linguist */
  linguist?: boolean;
  /** @description Whether this person is a location staff */
  locationStaff?: boolean;
  /** @description Whether this person is a make-up staff */
  makeupStaff?: boolean;
  /** @description Whether this person is from music department */
  musicDepartment?: boolean;
  /** @description Whether this person is a composer */
  composer?: boolean;
  /** @description Whether this person is a personal assistant */
  personalAssistant?: boolean;
  /** @description Whether this person is a producer */
  producer?: boolean;
  /** @description Whether this person is a production associate */
  productionAssociate?: boolean;
  /** @description Whether this person is a production staff */
  productionStaff?: boolean;
  /** @description Whether this person is a publication staff */
  publicationStaff?: boolean;
  /** @description Whether this person is a science consultant */
  scienceConsultant?: boolean;
  /** @description Whether this person is from sound department */
  soundDepartment?: boolean;
  /** @description Whether this person is a special and visual effects staff */
  specialAndVisualEffectsStaff?: boolean;
  /** @description Whether this person is an author */
  author?: boolean;
  /** @description Whether this person is an audio author */
  audioAuthor?: boolean;
  /** @description Whether this person is a calendar artist */
  calendarArtist?: boolean;
  /** @description Whether this person is a comic artist */
  comicArtist?: boolean;
  /** @description Whether this person is a comic author */
  comicAuthor?: boolean;
  /** @description Whether this person is a comic color artist */
  comicColorArtist?: boolean;
  /** @description Whether this person is a comic interior artist */
  comicInteriorArtist?: boolean;
  /** @description Whether this person is a comic ink artist */
  comicInkArtist?: boolean;
  /** @description Whether this person is a comic pencil artist */
  comicPencilArtist?: boolean;
  /** @description Whether this person is a comic letter artist */
  comicLetterArtist?: boolean;
  /** @description Whether this person is a comic strip artist */
  comicStripArtist?: boolean;
  /** @description Whether this person is a game artist */
  gameArtist?: boolean;
  /** @description Whether this person is a game author */
  gameAuthor?: boolean;
  /** @description Whether this person is a novel artist */
  novelArtist?: boolean;
  /** @description Whether this person is a novel author */
  novelAuthor?: boolean;
  /** @description Whether this person is a reference artist */
  referenceArtist?: boolean;
  /** @description Whether this person is a reference author */
  referenceAuthor?: boolean;
  /** @description Whether this person is a publication artist */
  publicationArtist?: boolean;
  /** @description Whether this person is a publication designer */
  publicationDesigner?: boolean;
  /** @description Whether this person is a publication editor */
  publicationEditor?: boolean;
  /** @description Whether this person is a publication artist */
  publicityArtist?: boolean;
  /** @description Whether this person is a part of CBS digital staff */
  cbsDigitalStaff?: boolean;
  /** @description Whether this person is a part of ILM production staff */
  ilmProductionStaff?: boolean;
  /** @description Whether this person is a special features artist */
  specialFeaturesStaff?: boolean;
  /** @description Whether this person is a story editor */
  storyEditor?: boolean;
  /** @description Whether this person is a studio executive */
  studioExecutive?: boolean;
  /** @description Whether this person is from stunt department */
  stuntDepartment?: boolean;
  /** @description Whether this person is from transportation department */
  transportationDepartment?: boolean;
  /** @description Whether this person is video game production staff */
  videoGameProductionStaff?: boolean;
  /** @description Whether this person is a writer */
  writer?: boolean;
};

export type StaffFull = {
  /** @description Staff unique ID */
  uid: string;
  /** @description Staff name */
  name: string;
  /** @description Staff birth name */
  birthName?: string;
  gender?: Gender;
  /** @description Date the staff was born */
  dateOfBirth?: string;
  /** @description Place the staff was born */
  placeOfBirth?: string;
  /** @description Date the staff died */
  dateOfDeath?: string;
  /** @description Place the staff died */
  placeOfDeath?: string;
  /** @description Whether this person is from art department */
  artDepartment?: boolean;
  /** @description Whether this person is an art director */
  artDirector?: boolean;
  /** @description Whether this person is a production designer */
  productionDesigner?: boolean;
  /** @description Whether this person is from camera and electrical department */
  cameraAndElectricalDepartment?: boolean;
  /** @description Whether this person is a cinematographer */
  cinematographer?: boolean;
  /** @description Whether this person is from casting department */
  castingDepartment?: boolean;
  /** @description Whether this person is from costume department */
  costumeDepartment?: boolean;
  /** @description Whether this person is a custume designer */
  costumeDesigner?: boolean;
  /** @description Whether this person is a director */
  director?: boolean;
  /** @description Whether this person is an assistant or secound unit director director */
  assistantOrSecondUnitDirector?: boolean;
  /** @description Whether this person is an exhibit and attraction staff */
  exhibitAndAttractionStaff?: boolean;
  /** @description Whether this person is a film editor */
  filmEditor?: boolean;
  /** @description Whether this person is a linguist */
  linguist?: boolean;
  /** @description Whether this person is a location staff */
  locationStaff?: boolean;
  /** @description Whether this person is a make-up staff */
  makeupStaff?: boolean;
  /** @description Whether this person is from music department */
  musicDepartment?: boolean;
  /** @description Whether this person is a composer */
  composer?: boolean;
  /** @description Whether this person is a personal assistant */
  personalAssistant?: boolean;
  /** @description Whether this person is a producer */
  producer?: boolean;
  /** @description Whether this person is a production associate */
  productionAssociate?: boolean;
  /** @description Whether this person is a production staff */
  productionStaff?: boolean;
  /** @description Whether this person is a publication staff */
  publicationStaff?: boolean;
  /** @description Whether this person is a science consultant */
  scienceConsultant?: boolean;
  /** @description Whether this person is from sound department */
  soundDepartment?: boolean;
  /** @description Whether this person is a special and visual effects staff */
  specialAndVisualEffectsStaff?: boolean;
  /** @description Whether this person is an author */
  author?: boolean;
  /** @description Whether this person is an audio author */
  audioAuthor?: boolean;
  /** @description Whether this person is a calendar artist */
  calendarArtist?: boolean;
  /** @description Whether this person is a comic artist */
  comicArtist?: boolean;
  /** @description Whether this person is a comic author */
  comicAuthor?: boolean;
  /** @description Whether this person is a comic color artist */
  comicColorArtist?: boolean;
  /** @description Whether this person is a comic interior artist */
  comicInteriorArtist?: boolean;
  /** @description Whether this person is a comic ink artist */
  comicInkArtist?: boolean;
  /** @description Whether this person is a comic pencil artist */
  comicPencilArtist?: boolean;
  /** @description Whether this person is a comic letter artist */
  comicLetterArtist?: boolean;
  /** @description Whether this person is a comic strip artist */
  comicStripArtist?: boolean;
  /** @description Whether this person is a game artist */
  gameArtist?: boolean;
  /** @description Whether this person is a game author */
  gameAuthor?: boolean;
  /** @description Whether this person is a novel artist */
  novelArtist?: boolean;
  /** @description Whether this person is a novel author */
  novelAuthor?: boolean;
  /** @description Whether this person is a reference artist */
  referenceArtist?: boolean;
  /** @description Whether this person is a reference author */
  referenceAuthor?: boolean;
  /** @description Whether this person is a publication artist */
  publicationArtist?: boolean;
  /** @description Whether this person is a publication designer */
  publicationDesigner?: boolean;
  /** @description Whether this person is a publication editor */
  publicationEditor?: boolean;
  /** @description Whether this person is a publicity artist */
  publicityArtist?: boolean;
  /** @description Whether this person is a part of CBS digital staff */
  cbsDigitalStaff?: boolean;
  /** @description Whether this person is a part of ILM production staff */
  ilmProductionStaff?: boolean;
  /** @description Whether this person is a special features artist */
  specialFeaturesStaff?: boolean;
  /** @description Whether this person is a story editor */
  storyEditor?: boolean;
  /** @description Whether this person is a studio executive */
  studioExecutive?: boolean;
  /** @description Whether this person is from stunt department */
  stuntDepartment?: boolean;
  /** @description Whether this person is from transportation department */
  transportationDepartment?: boolean;
  /** @description Whether this person is video game production staff */
  videoGameProductionStaff?: boolean;
  /** @description Whether this person is a writer */
  writer?: boolean;
  /** @description Episodes written by this person */
  writtenEpisodes?: EpisodeBase[];
  /** @description Episodes to which this person has written teleplay */
  teleplayAuthoredEpisodes?: EpisodeBase[];
  /** @description Episodes to which this person has written story */
  storyAuthoredEpisodes?: EpisodeBase[];
  /** @description Episodes directed by this person */
  directedEpisodes?: EpisodeBase[];
  /** @description Episodes on which this person worked */
  episodes?: EpisodeBase[];
  /** @description Movies written by this person */
  writtenMovies?: MovieBase[];
  /** @description Movies to which this person has written screenplay */
  screenplayAuthoredMovies?: MovieBase[];
  /** @description Movies to which this person has written story */
  storyAuthoredMovies?: MovieBase[];
  /** @description Movies directed by this person */
  directedMovies?: MovieBase[];
  /** @description Movies produced by this person */
  producedMovies?: MovieBase[];
  /** @description Movies on which this person worked */
  movies?: MovieBase[];
};

export type StaffBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of staff matching given criteria */
  staff?: StaffBase[];
};

export type StaffFullResponse = {
  staff?: StaffFull;
};

export type TechnologyHeader = {
  /** @description Technology unique ID */
  uid: string;
  /** @description Technology name */
  name: string;
};

export type TechnologyBase = {
  /** @description Technology unique ID */
  uid: string;
  /** @description Technology name */
  name: string;
  /** @description Whether it's a Borg technology */
  borgTechnology?: boolean;
  /** @description Whether it's a Borg component */
  borgComponent?: boolean;
  /** @description Whether it's a communications technology */
  communicationsTechnology?: boolean;
  /** @description Whether it's a computer technology */
  computerTechnology?: boolean;
  /** @description Whether it's a technology related to computer programming */
  computerProgramming?: boolean;
  /** @description Whether it's a subroutine */
  subroutine?: boolean;
  /** @description Whether it's a database */
  database?: boolean;
  /** @description Whether it's a energy technology */
  energyTechnology?: boolean;
  /** @description Whether it's a fictional technology */
  fictionalTechnology?: boolean;
  /** @description Whether it's a holographic technology */
  holographicTechnology?: boolean;
  /** @description Whether it's a identification technology */
  identificationTechnology?: boolean;
  /** @description Whether it's a life support technology */
  lifeSupportTechnology?: boolean;
  /** @description Whether it's a sensor technology */
  sensorTechnology?: boolean;
  /** @description Whether it's a shield technology */
  shieldTechnology?: boolean;
  /** @description Whether it's a tool */
  tool?: boolean;
  /** @description Whether it's a culinary tool */
  culinaryTool?: boolean;
  /** @description Whether it's a engineering tool */
  engineeringTool?: boolean;
  /** @description Whether it's a household tool */
  householdTool?: boolean;
  /** @description Whether it's a medical equipment */
  medicalEquipment?: boolean;
  /** @description Whether it's a transporter technology */
  transporterTechnology?: boolean;
};

export type TechnologyFull = {
  /** @description Technology unique ID */
  uid: string;
  /** @description Technology name */
  name: string;
  /** @description Whether it's a Borg technology */
  borgTechnology?: boolean;
  /** @description Whether it's a Borg component */
  borgComponent?: boolean;
  /** @description Whether it's a communications technology */
  communicationsTechnology?: boolean;
  /** @description Whether it's a computer technology */
  computerTechnology?: boolean;
  /** @description Whether it's a technology related to computer programming */
  computerProgramming?: boolean;
  /** @description Whether it's a subroutine */
  subroutine?: boolean;
  /** @description Whether it's a database */
  database?: boolean;
  /** @description Whether it's a energy technology */
  energyTechnology?: boolean;
  /** @description Whether it's a fictional technology */
  fictionalTechnology?: boolean;
  /** @description Whether it's a holographic technology */
  holographicTechnology?: boolean;
  /** @description Whether it's a identification technology */
  identificationTechnology?: boolean;
  /** @description Whether it's a life support technology */
  lifeSupportTechnology?: boolean;
  /** @description Whether it's a sensor technology */
  sensorTechnology?: boolean;
  /** @description Whether it's a shield technology */
  shieldTechnology?: boolean;
  /** @description Whether it's a tool */
  tool?: boolean;
  /** @description Whether it's a culinary tool */
  culinaryTool?: boolean;
  /** @description Whether it's a engineering tool */
  engineeringTool?: boolean;
  /** @description Whether it's a household tool */
  householdTool?: boolean;
  /** @description Whether it's a medical equipment */
  medicalEquipment?: boolean;
  /** @description Whether it's a transporter technology */
  transporterTechnology?: boolean;
};

export type TechnologyBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of technology matching given criteria */
  technology?: TechnologyBase[];
};

export type TechnologyFullResponse = {
  technology?: TechnologyFull;
};

export type TitleHeader = {
  /** @description Title unique ID */
  uid: string;
  /** @description Title name */
  name: string;
};

export type TitleBase = {
  /** @description Title unique ID */
  uid: string;
  /** @description Title name */
  name: string;
  /** @description Whether it's a military rank */
  militaryRank?: boolean;
  /** @description Whether it's a fleet rank */
  fleetRank?: boolean;
  /** @description Whether it's a religious title */
  religiousTitle?: boolean;
  /** @description Whether it's a position */
  position?: boolean;
  /** @description Whether this title is from mirror universe */
  mirror?: boolean;
};

export type TitleFull = {
  /** @description Title unique ID */
  uid: string;
  /** @description Title name */
  name: string;
  /** @description Whether it's a military rank */
  militaryRank?: boolean;
  /** @description Whether it's a fleet rank */
  fleetRank?: boolean;
  /** @description Whether it's a religious title */
  religiousTitle?: boolean;
  /** @description Whether it's a position */
  position?: boolean;
  /** @description Whether this title is from mirror universe */
  mirror?: boolean;
  /** @description Characters that holds this title */
  characters?: CharacterBase[];
};

export type TitleBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of titles matching given criteria */
  titles?: TitleBase[];
};

export type TitleFullResponse = {
  title?: TitleFull;
};

export type TradingCardHeader = {
  /** @description Trading card unique ID */
  uid: string;
  /** @description Trading card name */
  name: string;
};

export type TradingCardBase = {
  /** @description Trading card unique ID */
  uid: string;
  /** @description Trading card name */
  name: string;
  /** @description Trading card number */
  numberObject?: string;
  /** @description Release year, if set was releases over multiple years */
  releaseYear?: number;
  /** @description Production run, if different from trading card set production run */
  productionRun?: number;
  tradingCardSet?: TradingCardSetHeader;
  tradingCardDeck?: TradingCardDeckHeader;
};

export type TradingCardFull = {
  /** @description Trading card unique ID */
  uid: string;
  /** @description Trading card name */
  name: string;
  tradingCardSet?: TradingCardSetBase;
  tradingCardDeck?: TradingCardDeckBase;
  /** @description Trading card number */
  numberObject?: string;
  /** @description Release year, if set was releases over multiple years */
  releaseYear?: number;
  /** @description Production run, if different from trading card set production run */
  productionRun?: number;
};

export type TradingCardBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of trading cards matching given criteria */
  tradingCards?: TradingCardBase[];
};

export type TradingCardFullResponse = {
  tradingCard?: TradingCardFull;
};

export type TradingCardDeckHeader = {
  /** @description Trading card deck unique ID */
  uid: string;
  /** @description Trading card deck name */
  name: string;
};

export type TradingCardDeckBase = {
  /** @description Trading card deck unique ID */
  uid: string;
  /** @description Trading card deck name */
  name: string;
  /** @description Frequency with which this deck occur in it's set */
  frequency?: string;
  tradingCardSet?: TradingCardSetHeader;
};

export type TradingCardDeckFull = {
  /** @description Trading card deck unique ID */
  uid: string;
  /** @description Trading card deck name */
  name: string;
  /** @description Frequency with which this deck occur in it's set */
  frequency?: string;
  tradingCardSet?: TradingCardSetHeader;
  /** @description Trading cards in this deck */
  tradingCards?: TradingCardBase[];
};

export type TradingCardDeckBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of trading card decks matching given criteria */
  tradingCardDecks?: TradingCardDeckBase[];
};

export type TradingCardDeckFullResponse = {
  tradingCardDeck?: TradingCardDeckFull;
};

export type TradingCardSetHeader = {
  /** @description Trading card set unique ID */
  uid: string;
  /** @description Trading card set name */
  name: string;
};

export type TradingCardSetBase = {
  /** @description Trading card set unique ID */
  uid: string;
  /** @description Trading card set name */
  name: string;
  /** @description Release year */
  releaseYear?: number;
  /** @description Release month */
  releaseMonth?: number;
  /** @description Release day */
  releaseDay?: number;
  /** @description Cards per deck */
  cardsPerPack?: number;
  /** @description Packs per box */
  packsPerBox?: number;
  /** @description Boxes per case */
  boxesPerCase?: number;
  /** @description Production run */
  productionRun?: number;
  productionRunUnit?: ProductionRunUnit;
  /** @description Card width, in inches */
  cardWidth?: number;
  /** @description Card height, in inches */
  cardHeight?: number;
};

export type TradingCardSetFull = {
  /** @description Trading card set unique ID */
  uid: string;
  /** @description Trading card set name */
  name: string;
  /** @description Release year */
  releaseYear?: number;
  /** @description Release month */
  releaseMonth?: number;
  /** @description Release day */
  releaseDay?: number;
  /** @description Cards per deck */
  cardsPerPack?: number;
  /** @description Packs per box */
  packsPerBox?: number;
  /** @description Boxes per case */
  boxesPerCase?: number;
  /** @description Production run */
  productionRun?: number;
  productionRunUnit?: ProductionRunUnit;
  /** @description Card width, in inches */
  cardWidth?: number;
  /** @description Card height, in inches */
  cardHeight?: number;
  /** @description Manufacturers */
  manufacturers?: CompanyBase[];
  /** @description Trading card decks in this set */
  tradingCardDecks?: TradingCardDeckBase[];
  /** @description Trading cards in this set */
  tradingCards?: TradingCardBase[];
  /** @description Countries of origin */
  countriesOfOrigin?: Country[];
};

export type TradingCardSetBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of trading card sets matching given criteria */
  tradingCardSets?: TradingCardSetBase[];
};

export type TradingCardSetFullResponse = {
  tradingCardSet?: TradingCardSetFull;
};

export type VideoGameHeader = {
  /** @description Video game unique ID */
  uid: string;
  /** @description Video game title */
  title: string;
};

export type VideoGameBase = {
  /** @description Video game unique ID */
  uid: string;
  /** @description Video game title */
  title: string;
  /** @description Release date */
  releaseDate?: string;
  /** @description Starting stardate of video game story */
  stardateFrom?: number;
  /** @description Ending stardate of video game story */
  stardateTo?: number;
  /** @description Starting year of video game story */
  yearFrom?: number;
  /** @description Ending year of video game story */
  yearTo?: number;
  /** @description System requirements */
  systemRequirements?: string;
};

export type VideoGameFull = {
  /** @description Video game unique ID */
  uid: string;
  /** @description Video game title */
  title: string;
  /** @description Release date */
  releaseDate?: string;
  /** @description Starting stardate of video game story */
  stardateFrom?: number;
  /** @description Ending stardate of video game story */
  stardateTo?: number;
  /** @description Starting year of video game story */
  yearFrom?: number;
  /** @description Ending year of video game story */
  yearTo?: number;
  /** @description System requirements */
  systemRequirements?: string;
  /** @description Publishers */
  publishers?: CompanyBase[];
  /** @description Developers */
  developers?: CompanyBase[];
  /** @description Platforms */
  platforms?: Platform[];
  /** @description Genres */
  genres?: Genre[];
  /** @description Ratings */
  ratings?: ContentRating[];
  /** @description References */
  references?: Reference[];
};

export type VideoGameBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of video games matching given criteria */
  videoGames?: VideoGameBase[];
};

export type VideoGameFullResponse = {
  videoGame?: VideoGameFull;
};

export type VideoReleaseHeader = {
  /** @description Video release unique ID */
  uid: string;
  /** @description Video release title */
  title: string;
};

export type VideoReleaseBase = {
  /** @description Video release unique ID */
  uid: string;
  /** @description Video release title */
  title: string;
  series?: SeriesHeader;
  season?: SeasonHeader;
  format?: VideoReleaseFormat;
  /** @description Number of episodes */
  numberOfEpisodes?: number;
  /** @description Number of feature-length episodes */
  numberOfFeatureLengthEpisodes?: number;
  /** @description Number of data carriers (like DVD, VCD, VHS etc.) */
  numberOfDataCarriers?: number;
  /** @description Run time, in minutes */
  runTime?: number;
  /** @description Starting year of video release story */
  yearFrom?: number;
  /** @description Ending year of video release story */
  yearTo?: number;
  /** @description Region free release date */
  regionFreeReleaseDate?: string;
  /** @description Region 1/A release date */
  region1AReleaseDate?: string;
  /** @description Region 1 slimline release date */
  region1SlimlineReleaseDate?: string;
  /** @description Region 2/B release date */
  region2BReleaseDate?: string;
  /** @description Region 2 slimline release date */
  region2SlimlineReleaseDate?: string;
  /** @description Region 4 release date */
  region4AReleaseDate?: string;
  /** @description Region 4 slimline release date */
  region4SlimlineReleaseDate?: string;
  /** @description Whether this video has been release on Amazon.com */
  amazonDigitalRelease?: boolean;
  /** @description Whether this video has been release on Dailymotion */
  dailymotionDigitalRelease?: boolean;
  /** @description Whether this video has been release on Google Play */
  googlePlayDigitalRelease?: boolean;
  /** @description Whether this video has been release on iTunes */
  iTunesDigitalRelease?: boolean;
  /** @description Whether this video has been release on UltraViolet */
  ultraVioletDigitalRelease?: boolean;
  /** @description Whether this video has been release on Vimeo */
  vimeoDigitalRelease?: boolean;
  /** @description Whether this video has been release on VUDU */
  vuduDigitalRelease?: boolean;
  /** @description Whether this video has been release on Xbox SmartGlass */
  xboxSmartGlassDigitalRelease?: boolean;
  /** @description Whether this video has been release on YouTube */
  youTubeDigitalRelease?: boolean;
  /** @description Whether this video has been release on Netflix */
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
  /** @description Video release unique ID */
  uid: string;
  /** @description Video release title */
  title: string;
  series?: SeriesBase;
  season?: SeasonBase;
  format?: VideoReleaseFormat;
  /** @description Number of episodes */
  numberOfEpisodes?: number;
  /** @description Number of feature-length episodes */
  numberOfFeatureLengthEpisodes?: number;
  /** @description Number of data carriers (like DVD, VCD, VHS etc.) */
  numberOfDataCarriers?: number;
  /** @description Run time, in minutes */
  runTime?: number;
  /** @description Starting year of video release story */
  yearFrom?: number;
  /** @description Ending year of video release story */
  yearTo?: number;
  /** @description Region free release date */
  regionFreeReleaseDate?: string;
  /** @description Region 1/A release date */
  region1AReleaseDate?: string;
  /** @description Region 1 slimline release date */
  region1SlimlineReleaseDate?: string;
  /** @description Region 2/B release date */
  region2BReleaseDate?: string;
  /** @description Region 2 slimline release date */
  region2SlimlineReleaseDate?: string;
  /** @description Region 4 release date */
  region4AReleaseDate?: string;
  /** @description Region 4 slimline release date */
  region4SlimlineReleaseDate?: string;
  /** @description Whether this video has been release on Amazon.com */
  amazonDigitalRelease?: boolean;
  /** @description Whether this video has been release on Dailymotion */
  dailymotionDigitalRelease?: boolean;
  /** @description Whether this video has been release on Google Play */
  googlePlayDigitalRelease?: boolean;
  /** @description Whether this video has been release on iTunes */
  iTunesDigitalRelease?: boolean;
  /** @description Whether this video has been release on UltraViolet */
  ultraVioletDigitalRelease?: boolean;
  /** @description Whether this video has been release on Vimeo */
  vimeoDigitalRelease?: boolean;
  /** @description Whether this video has been release on VUDU */
  vuduDigitalRelease?: boolean;
  /** @description Whether this video has been release on Xbox SmartGlass */
  xboxSmartGlassDigitalRelease?: boolean;
  /** @description Whether this video has been release on YouTube */
  youTubeDigitalRelease?: boolean;
  /** @description Whether this video has been release on Netflix */
  netflixDigitalRelease?: boolean;
  /** @description References */
  references?: Reference[];
  /** @description Ratings */
  ratings?: ContentRating[];
  /** @description Languages of audio track */
  languages?: ContentLanguage[];
  /** @description Languages of subtitles */
  languagesSubtitles?: ContentLanguage[];
  /** @description Languages that are available with dubbing */
  languagesDubbed?: ContentLanguage[];
};

export type VideoReleaseBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of video releases matching given criteria */
  videoReleases?: VideoReleaseBase[];
};

export type VideoReleaseFullResponse = {
  videoRelease?: VideoReleaseFull;
};

export type WeaponHeader = {
  /** @description Weapon unique ID */
  uid: string;
  /** @description Weapon name */
  name: string;
};

export type WeaponBase = {
  /** @description Weapon unique ID */
  uid: string;
  /** @description Weapon name */
  name: string;
  /** @description Whether it's hand-help weapon */
  handHeldWeapon?: boolean;
  /** @description Whether it's a laser technology */
  laserTechnology?: boolean;
  /** @description Whether it's a plasma technology */
  plasmaTechnology?: boolean;
  /** @description Whether it's a photonic technology */
  photonicTechnology?: boolean;
  /** @description Whether it's a phaser technology */
  phaserTechnology?: boolean;
  /** @description Whether this weapon is from mirror universe */
  mirror?: boolean;
  /** @description Whether this weapon is from alternate reality */
  alternateReality?: boolean;
};

export type WeaponFull = {
  /** @description Weapon unique ID */
  uid: string;
  /** @description Weapon name */
  name: string;
  /** @description Whether it's a hand-help weapon */
  handHeldWeapon?: boolean;
  /** @description Whether it's a laser technology */
  laserTechnology?: boolean;
  /** @description Whether it's a plasma technology */
  plasmaTechnology?: boolean;
  /** @description Whether it's a photonic technology */
  photonicTechnology?: boolean;
  /** @description Whether it's a phaser technology */
  phaserTechnology?: boolean;
  /** @description Whether this weapon is from mirror universe */
  mirror?: boolean;
  /** @description Whether this weapon is from alternate reality */
  alternateReality?: boolean;
};

export type WeaponBaseResponse = {
  page?: ResponsePage;
  sort?: ResponseSort;
  /** @description List of weapons matching given criteria */
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
