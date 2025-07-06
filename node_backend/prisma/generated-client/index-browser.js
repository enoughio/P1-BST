
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  username: 'username',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  mobile: 'mobile',
  avatar: 'avatar',
  address: 'address',
  gender: 'gender',
  dob: 'dob',
  idProof: 'idProof',
  isActive: 'isActive',
  isStaff: 'isStaff',
  isSuperuser: 'isSuperuser',
  dateJoined: 'dateJoined',
  lastLogin: 'lastLogin',
  clubId: 'clubId'
};

exports.Prisma.MemberScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  role: 'role',
  occupation: 'occupation'
};

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  role: 'role'
};

exports.Prisma.MemberRemovalRequestScalarFieldEnum = {
  id: 'id',
  memberId: 'memberId',
  requestedById: 'requestedById',
  reason: 'reason',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InitiativeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  eligibleAge: 'eligibleAge',
  description: 'description',
  maxClubSize: 'maxClubSize',
  membershipId: 'membershipId'
};

exports.Prisma.ClubScalarFieldEnum = {
  clubId: 'clubId',
  clubName: 'clubName',
  street: 'street',
  city: 'city',
  state: 'state',
  postalCode: 'postalCode',
  country: 'country',
  meetingTime: 'meetingTime',
  map: 'map',
  image: 'image',
  description: 'description',
  email: 'email',
  mobile: 'mobile',
  initiativeId: 'initiativeId'
};

exports.Prisma.MembershipScalarFieldEnum = {
  id: 'id',
  name: 'name',
  fee: 'fee',
  durationInMonths: 'durationInMonths'
};

exports.Prisma.MembershipHistoryScalarFieldEnum = {
  id: 'id',
  memberId: 'memberId',
  membershipTypeId: 'membershipTypeId',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.AwardScalarFieldEnum = {
  id: 'id',
  title: 'title',
  date: 'date',
  type: 'type'
};

exports.Prisma.MemberAwardScalarFieldEnum = {
  memberId: 'memberId',
  awardId: 'awardId'
};

exports.Prisma.EventScalarFieldEnum = {
  eventId: 'eventId',
  title: 'title',
  description: 'description',
  date: 'date',
  time: 'time',
  location: 'location',
  image: 'image',
  highlighted: 'highlighted',
  attendees: 'attendees',
  maxCapacity: 'maxCapacity',
  ticketPrice: 'ticketPrice',
  categories: 'categories',
  clubId: 'clubId'
};

exports.Prisma.SpeakerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  role: 'role',
  bio: 'bio',
  image: 'image'
};

exports.Prisma.EventSpeakerScalarFieldEnum = {
  eventId: 'eventId',
  speakerId: 'speakerId'
};

exports.Prisma.ScheduleItemScalarFieldEnum = {
  id: 'id',
  time: 'time',
  title: 'title',
  description: 'description'
};

exports.Prisma.EventScheduleItemScalarFieldEnum = {
  eventId: 'eventId',
  scheduleItemId: 'scheduleItemId'
};

exports.Prisma.EventPhotoScalarFieldEnum = {
  id: 'id',
  image: 'image',
  alt: 'alt'
};

exports.Prisma.EventPhotoLinkScalarFieldEnum = {
  eventId: 'eventId',
  eventPhotoId: 'eventPhotoId'
};

exports.Prisma.EventRegistrationScalarFieldEnum = {
  regId: 'regId',
  eventId: 'eventId',
  name: 'name',
  email: 'email',
  phoneNumber: 'phoneNumber',
  address: 'address',
  gender: 'gender',
  occupation: 'occupation',
  fee: 'fee'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  registrationId: 'registrationId',
  paymentId: 'paymentId',
  orderId: 'orderId',
  signature: 'signature',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExecutiveCommitteeScalarFieldEnum = {
  id: 'id',
  memberId: 'memberId',
  role: 'role'
};

exports.Prisma.MeetingScalarFieldEnum = {
  meetingId: 'meetingId',
  title: 'title',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime',
  description: 'description',
  meetingType: 'meetingType',
  createdAt: 'createdAt',
  clubId: 'clubId',
  mocId: 'mocId',
  omcId: 'omcId',
  moderatorId: 'moderatorId',
  coordinatorId: 'coordinatorId',
  timekeeperId: 'timekeeperId',
  listenerId: 'listenerId',
  fillerCounterId: 'fillerCounterId',
  speaker1Id: 'speaker1Id',
  speaker2Id: 'speaker2Id',
  speaker3Id: 'speaker3Id',
  speechEvaluator1Id: 'speechEvaluator1Id',
  speechEvaluator2Id: 'speechEvaluator2Id',
  presidentId: 'presidentId',
  vicePresidentEducationId: 'vicePresidentEducationId',
  vicePresidentMembershipId: 'vicePresidentMembershipId',
  vicePresidentPublicRelationsId: 'vicePresidentPublicRelationsId',
  secretaryId: 'secretaryId',
  sergeantAtArmsId: 'sergeantAtArmsId'
};

exports.Prisma.ProjectScalarFieldEnum = {
  projectId: 'projectId',
  title: 'title',
  description: 'description'
};

exports.Prisma.ProjectAssignmentScalarFieldEnum = {
  id: 'id',
  memberId: 'memberId',
  projectId: 'projectId',
  assignedDate: 'assignedDate',
  deadline: 'deadline'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  orderId: 'orderId',
  signature: 'signature',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.Occupation = exports.$Enums.Occupation = {
  STUDENT: 'STUDENT',
  EMPLOYEE: 'EMPLOYEE',
  BUSINESS: 'BUSINESS',
  SELF_EMPLOYED: 'SELF_EMPLOYED'
};

exports.AdminRole = exports.$Enums.AdminRole = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.RequestStatus = exports.$Enums.RequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  CREATED: 'CREATED',
  CAPTURED: 'CAPTURED',
  FAILED: 'FAILED'
};

exports.ExecutiveRole = exports.$Enums.ExecutiveRole = {
  PRESIDENT: 'PRESIDENT',
  VICE_PRESIDENT_EDUCATION: 'VICE_PRESIDENT_EDUCATION',
  VICE_PRESIDENT_MEMBERSHIP: 'VICE_PRESIDENT_MEMBERSHIP',
  VICE_PRESIDENT_PUBLIC_RELATIONS: 'VICE_PRESIDENT_PUBLIC_RELATIONS',
  SECRETARY: 'SECRETARY',
  SERGEANT_AT_ARMS: 'SERGEANT_AT_ARMS'
};

exports.MeetingType = exports.$Enums.MeetingType = {
  WEEKLY: 'WEEKLY',
  EXECUTIVE_COMMITTEE: 'EXECUTIVE_COMMITTEE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Member: 'Member',
  Admin: 'Admin',
  MemberRemovalRequest: 'MemberRemovalRequest',
  Initiative: 'Initiative',
  Club: 'Club',
  Membership: 'Membership',
  MembershipHistory: 'MembershipHistory',
  Award: 'Award',
  MemberAward: 'MemberAward',
  Event: 'Event',
  Speaker: 'Speaker',
  EventSpeaker: 'EventSpeaker',
  ScheduleItem: 'ScheduleItem',
  EventScheduleItem: 'EventScheduleItem',
  EventPhoto: 'EventPhoto',
  EventPhotoLink: 'EventPhotoLink',
  EventRegistration: 'EventRegistration',
  Payment: 'Payment',
  ExecutiveCommittee: 'ExecutiveCommittee',
  Meeting: 'Meeting',
  Project: 'Project',
  ProjectAssignment: 'ProjectAssignment',
  Transaction: 'Transaction'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
