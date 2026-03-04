import "reflect-metadata";
import { DataSource, EntitySchema } from "typeorm";

// --- Entity Schemas (decorator-free for SWC compatibility) ---

export interface IContactSubmission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  createdAt: Date;
}

export const ContactSubmission = new EntitySchema<IContactSubmission>({
  name: "ContactSubmission",
  tableName: "contact_submissions",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    name: { type: "varchar" },
    email: { type: "varchar" },
    company: { type: "varchar", nullable: true },
    message: { type: "text" },
    createdAt: { type: "timestamp", createDate: true },
  },
});

export interface IBusinessProfile {
  id: number;
  businessName: string;
  category: string;
  description: string | null;
  phone: string | null;
  email: string;
  website: string | null;
  needsWebsite: boolean;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  weekdayOpen: string | null;
  weekdayClose: string | null;
  saturdayOpen: string | null;
  saturdayClose: string | null;
  sundayOpen: string | null;
  sundayClose: string | null;
  keywords: string | null;
  customKeywords: string | null;
  authorized: boolean;
  password: string | null;
  status: string;
  createdAt: Date;
}

export const BusinessProfile = new EntitySchema<IBusinessProfile>({
  name: "BusinessProfile",
  tableName: "business_profiles",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    businessName: { type: "varchar" },
    category: { type: "varchar" },
    description: { type: "text", nullable: true },
    phone: { type: "varchar", nullable: true },
    email: { type: "varchar" },
    website: { type: "varchar", nullable: true },
    needsWebsite: { type: "boolean", default: false },
    address: { type: "varchar", nullable: true },
    city: { type: "varchar", nullable: true },
    state: { type: "varchar", nullable: true },
    zip: { type: "varchar", nullable: true },
    weekdayOpen: { type: "varchar", nullable: true },
    weekdayClose: { type: "varchar", nullable: true },
    saturdayOpen: { type: "varchar", nullable: true },
    saturdayClose: { type: "varchar", nullable: true },
    sundayOpen: { type: "varchar", nullable: true },
    sundayClose: { type: "varchar", nullable: true },
    keywords: { type: "text", nullable: true },
    customKeywords: { type: "text", nullable: true },
    authorized: { type: "boolean", default: false },
    password: { type: "varchar", nullable: true },
    status: { type: "varchar", default: "active" },
    createdAt: { type: "timestamp", createDate: true },
  },
});

export interface IClientOnboarding {
  id: number;
  // Step 1: Services
  services: string; // Comma-separated list

  // Step 2: Business
  companyName: string;
  websiteUrl: string;
  industry: string;
  businessType: string | null;
  primaryCity: string;
  state: string;
  serviceRadius: string | null;
  extraMarkets: string | null;
  contactName: string;
  contactRole: string | null;
  contactEmail: string;
  contactPhone: string;
  bestTimeToReach: string | null;
  communicationPreference: string | null;
  billingEmail: string | null;

  // Step 3: Goals
  primaryGoal: string;
  targetKeywords: string | null;
  goal90Days: string;
  goal12Months: string | null;
  deadlines: string | null;
  leadSources: string | null; // Comma-separated list
  monthlyLeadGoal: number | null;
  avgClientValue: number | null;

  // Step 4: Presence
  cms: string;
  hosting: string | null;
  registrar: string | null;
  domainAge: string | null;
  existingTools: string | null; // Comma-separated list
  prevAgency: string | null;
  hasPenalty: string | null;
  penaltyDetail: string | null;
  currentTraffic: string | null;
  currentLeadsFromSite: string | null;
  reviewCount: number | null;
  reviewRating: string | null;
  gbpCategory: string | null;
  hasDuplicateGbp: string | null;
  aiPresence: string | null;
  hasRegularContent: string | null;
  lsaLicensed: string | null;
  bgCheckOnFile: string | null;
  runningAds: string | null; // Comma-separated list
  currentAdSpend: string | null;
  hasGoogleAdsAccount: string | null;
  hasMetaBusinessManager: string | null;
  adsHistory: string | null;

  // Step 5: Competition
  comp1: string;
  comp1Strength: string | null;
  comp2: string | null;
  comp3: string | null;
  competitiveAdvantage: string | null;
  priorityCompetitor: string | null;
  gapKeywords: string | null;
  yourReviewsCount: number | null;
  yourRatingValue: string | null;

  // Step 6: Access
  hasGoogleAccount: string;
  googleEmail: string | null;
  bizEmailForGoogle: string | null;
  accessGranted: string | null; // Comma-separated list
  metaAccessType: string | null;
  devContact: string | null;
  crmSystem: string | null;
  callTracking: string | null;
  otherToolsToConnect: string | null;

  // Step 7: Budget & Automation
  adSpendBudget: string | null;
  customSpendAmount: string | null;
  numLocationsRunningAds: string | null;
  preferredStartDate: string | null;
  specificStartDate: Date | null;
  finalNotes: string | null;

  // Automation Specifics
  autoBizDesc: string | null;
  autoRepetitiveTasks: string | null; // Comma-separated list
  autoPrimaryWorkflow: string | null;
  autoPeopleCount: string | null;
  autoTimeCostPerWeek: string | null;
  autoPainPoints: string | null;
  autoTriggers: string | null; // Comma-separated list
  autoImmediateAction: string | null;
  autoHasBranches: string | null;
  autoBranchLogic: string | null;
  autoDesiredOutcome: string | null;
  autoFailMode: string | null;
  autoCompliance: string | null; // Comma-separated list
  autoCrmName: string | null;
  autoCrmOther: string | null;
  autoCommsTools: string | null; // Comma-separated list
  autoSchedTools: string | null; // Comma-separated list
  autoDocTools: string | null; // Comma-separated list
  autoOtherTechTools: string | null;
  autoDataStorage: string | null; // Comma-separated list
  autoWorkEmail: string | null;
  autoApiAdminRights: string | null;
  autoItContact: string | null;
  autoHeadcountToReplace: number | null;
  autoRolesToReplace: string | null; // Comma-separated list
  autoTimelineExpectation: string | null;
  autoFinalNotes: string | null;

  createdAt: Date;
}

export const ClientOnboarding = new EntitySchema<IClientOnboarding>({
  name: "ClientOnboarding",
  tableName: "client_onboardings",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    services: { type: "text" },
    companyName: { type: "varchar" },
    websiteUrl: { type: "varchar" },
    industry: { type: "varchar" },
    businessType: { type: "varchar", nullable: true },
    primaryCity: { type: "varchar" },
    state: { type: "varchar" },
    serviceRadius: { type: "varchar", nullable: true },
    extraMarkets: { type: "text", nullable: true },
    contactName: { type: "varchar" },
    contactRole: { type: "varchar", nullable: true },
    contactEmail: { type: "varchar" },
    contactPhone: { type: "varchar" },
    bestTimeToReach: { type: "varchar", nullable: true },
    communicationPreference: { type: "varchar", nullable: true },
    billingEmail: { type: "varchar", nullable: true },
    primaryGoal: { type: "varchar" },
    targetKeywords: { type: "text", nullable: true },
    goal90Days: { type: "varchar" },
    goal12Months: { type: "varchar", nullable: true },
    deadlines: { type: "text", nullable: true },
    leadSources: { type: "text", nullable: true },
    monthlyLeadGoal: { type: "int", nullable: true },
    avgClientValue: { type: "int", nullable: true },
    cms: { type: "varchar" },
    hosting: { type: "varchar", nullable: true },
    registrar: { type: "varchar", nullable: true },
    domainAge: { type: "varchar", nullable: true },
    existingTools: { type: "text", nullable: true },
    prevAgency: { type: "varchar", nullable: true },
    hasPenalty: { type: "varchar", nullable: true },
    penaltyDetail: { type: "text", nullable: true },
    currentTraffic: { type: "varchar", nullable: true },
    currentLeadsFromSite: { type: "varchar", nullable: true },
    reviewCount: { type: "int", nullable: true },
    reviewRating: { type: "varchar", nullable: true },
    gbpCategory: { type: "varchar", nullable: true },
    hasDuplicateGbp: { type: "varchar", nullable: true },
    aiPresence: { type: "varchar", nullable: true },
    hasRegularContent: { type: "varchar", nullable: true },
    lsaLicensed: { type: "varchar", nullable: true },
    bgCheckOnFile: { type: "varchar", nullable: true },
    runningAds: { type: "text", nullable: true },
    currentAdSpend: { type: "varchar", nullable: true },
    hasGoogleAdsAccount: { type: "varchar", nullable: true },
    hasMetaBusinessManager: { type: "varchar", nullable: true },
    adsHistory: { type: "text", nullable: true },
    comp1: { type: "varchar" },
    comp1Strength: { type: "text", nullable: true },
    comp2: { type: "varchar", nullable: true },
    comp3: { type: "varchar", nullable: true },
    competitiveAdvantage: { type: "text", nullable: true },
    priorityCompetitor: { type: "varchar", nullable: true },
    gapKeywords: { type: "text", nullable: true },
    yourReviewsCount: { type: "int", nullable: true },
    yourRatingValue: { type: "varchar", nullable: true },
    hasGoogleAccount: { type: "varchar" },
    googleEmail: { type: "varchar", nullable: true },
    bizEmailForGoogle: { type: "varchar", nullable: true },
    accessGranted: { type: "text", nullable: true },
    metaAccessType: { type: "varchar", nullable: true },
    devContact: { type: "varchar", nullable: true },
    crmSystem: { type: "varchar", nullable: true },
    callTracking: { type: "varchar", nullable: true },
    otherToolsToConnect: { type: "text", nullable: true },
    adSpendBudget: { type: "varchar", nullable: true },
    customSpendAmount: { type: "varchar", nullable: true },
    numLocationsRunningAds: { type: "varchar", nullable: true },
    preferredStartDate: { type: "varchar", nullable: true },
    specificStartDate: { type: "date", nullable: true },
    finalNotes: { type: "text", nullable: true },
    autoBizDesc: { type: "text", nullable: true },
    autoRepetitiveTasks: { type: "text", nullable: true },
    autoPrimaryWorkflow: { type: "text", nullable: true },
    autoPeopleCount: { type: "varchar", nullable: true },
    autoTimeCostPerWeek: { type: "varchar", nullable: true },
    autoPainPoints: { type: "text", nullable: true },
    autoTriggers: { type: "text", nullable: true },
    autoImmediateAction: { type: "text", nullable: true },
    autoHasBranches: { type: "varchar", nullable: true },
    autoBranchLogic: { type: "text", nullable: true },
    autoDesiredOutcome: { type: "text", nullable: true },
    autoFailMode: { type: "varchar", nullable: true },
    autoCompliance: { type: "text", nullable: true },
    autoCrmName: { type: "varchar", nullable: true },
    autoCrmOther: { type: "varchar", nullable: true },
    autoCommsTools: { type: "text", nullable: true },
    autoSchedTools: { type: "text", nullable: true },
    autoDocTools: { type: "text", nullable: true },
    autoOtherTechTools: { type: "text", nullable: true },
    autoDataStorage: { type: "text", nullable: true },
    autoWorkEmail: { type: "varchar", nullable: true },
    autoApiAdminRights: { type: "varchar", nullable: true },
    autoItContact: { type: "varchar", nullable: true },
    autoHeadcountToReplace: { type: "int", nullable: true },
    autoRolesToReplace: { type: "text", nullable: true },
    autoTimelineExpectation: { type: "varchar", nullable: true },
    autoFinalNotes: { type: "text", nullable: true },
    createdAt: { type: "timestamp", createDate: true },
  },
});

// --- External Tables (shared DB) ---

export interface IClient {
  id: number;
  client_email: string;
  agreement_signed: boolean;
}

export const Client = new EntitySchema<IClient>({
  name: "Client",
  tableName: "clients",
  synchronize: false,
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    client_email: { type: "varchar" },
    agreement_signed: { type: "boolean", default: false },
  },
});

export interface INewsletterSubscriber {
  id: number;
  email: string;
  createdAt: Date;
}

export const NewsletterSubscriber = new EntitySchema<INewsletterSubscriber>({
  name: "NewsletterSubscriber",
  tableName: "newsletter_subscribers",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    email: { type: "varchar", unique: true },
    createdAt: { type: "timestamp", createDate: true },
  },
});

// --- DataSource Singleton ---

let dataSource: DataSource | null = null;

function parseDbUrl(raw: string) {
  const withoutProtocol = raw.replace(/^postgresql:\/\//, "");
  const atIdx = withoutProtocol.lastIndexOf("@");
  const creds = withoutProtocol.substring(0, atIdx);
  const rest = withoutProtocol.substring(atIdx + 1);
  const colonIdx = creds.indexOf(":");
  const [hostPort, database] = rest.split("/");
  const [host, portStr] = hostPort.split(":");
  return {
    username: creds.substring(0, colonIdx),
    password: creds.substring(colonIdx + 1),
    host,
    port: parseInt(portStr, 10),
    database,
  };
}

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const conn = parseDbUrl(process.env.DATABASE_URL!);

  dataSource = new DataSource({
    type: "postgres",
    host: conn.host,
    port: conn.port,
    username: conn.username,
    password: conn.password,
    database: conn.database,
    entities: [ContactSubmission, BusinessProfile, NewsletterSubscriber, ClientOnboarding, Client],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
  });

  await dataSource.initialize();
  return dataSource;
}
