// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {prisma} from './src/config/database.js'


dotenv.config();
// const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data in correct order (to handle foreign key constraints)
    console.log('🧹 Cleaning existing data...');
    await prisma.memberAward.deleteMany();
    await prisma.projectAssignment.deleteMany();
    await prisma.membershipHistory.deleteMany();
    await prisma.executiveCommittee.deleteMany();
    await prisma.eventRegistration.deleteMany();
    await prisma.eventSpeaker.deleteMany();
    await prisma.eventScheduleItem.deleteMany();
    await prisma.eventPhotoLink.deleteMany();
    await prisma.meeting.deleteMany();
    await prisma.event.deleteMany();
    await prisma.project.deleteMany();
    await prisma.award.deleteMany();
    await prisma.speaker.deleteMany();
    await prisma.scheduleItem.deleteMany();
    await prisma.eventPhoto.deleteMany();
    await prisma.member.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();
    await prisma.club.deleteMany();
    await prisma.initiative.deleteMany();
    await prisma.membership.deleteMany();

    console.log('✅ Cleaned existing data');

    // Create sample memberships
    const basicMembership = await prisma.membership.create({
      data: {
        id: 'BASC',
        name: 'Basic Membership',
        fee: 500.00,
        durationInMonths: 6
      }
    });

    const premiumMembership = await prisma.membership.create({
      data: {
        id: 'PREM',
        name: 'Premium Membership',
        fee: 1000.00,
        durationInMonths: 12
      }
    });

    const executiveMembership = await prisma.membership.create({
      data: {
        id: 'EXEC',
        name: 'Executive Membership',
        fee: 1500.00,
        durationInMonths: 24
      }
    });

    console.log('✅ Created sample memberships');

    // Create sample initiative
    const initiative = await prisma.initiative.create({
      data: {
        title: 'Youth Development Program',
        eligibleAge: '18-35',
        description: 'A program focused on developing communication and leadership skills among youth',
        maxClubSize: 50,
        membershipId: basicMembership.id
      }
    });

    console.log('✅ Created sample initiative');

    // Create sample clubs
    const mumbaiClub = await prisma.club.create({
      data: {
        clubId: 'C0001',
        clubName: 'BST Mumbai Central',
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        meetingTime: 'Saturdays, 5:00 PM',
        description: 'A vibrant storytelling club in the heart of Mumbai',
        email: 'mumbaicentral@bst.org',
        mobile: '9876543210',
        initiativeId: initiative.id
      }
    });

    const delhiClub = await prisma.club.create({
      data: {
        clubId: 'C0002',
        clubName: 'BST Delhi Capitol',
        street: '456 CP',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
        meetingTime: 'Sundays, 4:00 PM',
        description: 'Premium storytelling club in the capital',
        email: 'delhicapitol@bst.org',
        mobile: '9876543211',
        initiativeId: initiative.id
      }
    });

    console.log('✅ Created sample clubs');

    // Create sample super admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const superAdminUser = await prisma.user.create({
      data: {
        email: 'admin@bst.org',
        username: 'superadmin',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        mobile: '9876543210',
        gender: 'MALE',
        dob: new Date('1990-01-01'),
        isActive: true,
        isStaff: true,
        isSuperuser: true,
        clubId: mumbaiClub.clubId
      }
    });

    // Create admin record for super admin
    await prisma.admin.create({
      data: {
        userId: superAdminUser.id,
        role: 'SUPER_ADMIN'
      }
    });

    console.log('✅ Created super admin user');

    // Create sample admin user
    const adminPassword = await bcrypt.hash('admin456', 10);
    
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin.mumbai@bst.org',
        username: 'mumbai_admin',
        password: adminPassword,
        firstName: 'Mumbai',
        lastName: 'Admin',
        mobile: '9876543212',
        gender: 'FEMALE',
        dob: new Date('1985-06-15'),
        isActive: true,
        isStaff: true,
        isSuperuser: false,
        clubId: mumbaiClub.clubId
      }
    });

    // Create admin record
    await prisma.admin.create({
      data: {
        userId: adminUser.id,
        role: 'ADMIN'
      }
    });

    console.log('✅ Created admin user');

    // Create sample regular users/members
    const memberPassword = await bcrypt.hash('user123', 10);
    
    const member1User = await prisma.user.create({
      data: {
        email: 'john@example.com',
        username: 'johndoe',
        password: memberPassword,
        firstName: 'John',
        lastName: 'Doe',
        mobile: '9876543213',
        gender: 'MALE',
        dob: new Date('1995-03-20'),
        clubId: mumbaiClub.clubId
      }
    });

    const member1 = await prisma.member.create({
      data: {
        userId: member1User.id,
        role: 'Member',
        occupation: 'STUDENT'
      }
    });

    const member2User = await prisma.user.create({
      data: {
        email: 'jane@example.com',
        username: 'janedoe',
        password: memberPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        mobile: '9876543214',
        gender: 'FEMALE',
        dob: new Date('1993-08-10'),
        clubId: delhiClub.clubId
      }
    });

    const member2 = await prisma.member.create({
      data: {
        userId: member2User.id,
        role: 'Vice President',
        occupation: 'EMPLOYEE'
      }
    });

    const member3User = await prisma.user.create({
      data: {
        email: 'alex@example.com',
        username: 'alexjohnson',
        password: memberPassword,
        firstName: 'Alex',
        lastName: 'Johnson',
        mobile: '9876543215',
        gender: 'OTHER',
        dob: new Date('1992-12-05'),
        clubId: mumbaiClub.clubId
      }
    });

    const member3 = await prisma.member.create({
      data: {
        userId: member3User.id,
        role: 'Secretary',
        occupation: 'BUSINESS'
      }
    });

    console.log('✅ Created sample members');

    // Create sample awards
    const award1 = await prisma.award.create({
      data: {
        title: 'Best Speaker of the Month',
        type: 'Monthly Recognition',
        date: new Date()
      }
    });

    const award2 = await prisma.award.create({
      data: {
        title: 'Outstanding Leadership',
        type: 'Annual Award',
        date: new Date()
      }
    });

    const award3 = await prisma.award.create({
      data: {
        title: 'Most Improved Member',
        type: 'Quarterly Award',
        date: new Date()
      }
    });

    // Assign awards to members
    await prisma.memberAward.create({
      data: {
        memberId: member1.id,
        awardId: award1.id
      }
    });

    await prisma.memberAward.create({
      data: {
        memberId: member2.id,
        awardId: award2.id
      }
    });

    console.log('✅ Created sample awards and assignments');

    // Create sample speakers
    const speaker1 = await prisma.speaker.create({
      data: {
        name: 'Dr. Rajesh Kumar',
        role: 'Motivational Speaker',
        bio: 'Renowned speaker with 15+ years of experience in storytelling and communication',
        image: 'rajesh_kumar.jpg'
      }
    });

    const speaker2 = await prisma.speaker.create({
      data: {
        name: 'Priya Sharma',
        role: 'Corporate Trainer',
        bio: 'Expert in leadership development and public speaking training'
      }
    });

    console.log('✅ Created sample speakers');

    // Create sample events
    const event1 = await prisma.event.create({
      data: {
        eventId: 'EVT001',
        title: 'Annual Storytelling Championship',
        description: 'Join us for an exciting storytelling competition featuring participants from across the region.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        time: new Date('2024-01-01T18:00:00Z'),
        location: 'BST Mumbai Central',
        highlighted: true,
        maxCapacity: 100,
        ticketPrice: '200',
        clubId: mumbaiClub.clubId,
        categories: ["Competition", "Storytelling", "Public Speaking"]
      }
    });

    const event2 = await prisma.event.create({
      data: {
        eventId: 'EVT002',
        title: 'Leadership Workshop',
        description: 'Interactive workshop on developing leadership skills through storytelling.',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        time: new Date('2024-01-01T14:00:00Z'),
        location: 'BST Delhi Capitol',
        highlighted: false,
        maxCapacity: 50,
        ticketPrice: '150',
        clubId: delhiClub.clubId,
        categories: ["Workshop", "Leadership", "Training"]
      }
    });

    // Assign speakers to events
    await prisma.eventSpeaker.create({
      data: {
        eventId: event1.eventId,
        speakerId: speaker1.id
      }
    });

    await prisma.eventSpeaker.create({
      data: {
        eventId: event2.eventId,
        speakerId: speaker2.id
      }
    });

    console.log('✅ Created sample events and speaker assignments');

    // Create sample projects
    const project1 = await prisma.project.create({
      data: {
        title: 'Community Outreach Program',
        description: 'Organize storytelling sessions in local schools and community centers'
      }
    });

    const project2 = await prisma.project.create({
      data: {
        title: 'Digital Storytelling Initiative',
        description: 'Create online content and digital storytelling workshops'
      }
    });

    // Assign projects to members
    await prisma.projectAssignment.create({
      data: {
        memberId: member1.id,
        projectId: project1.projectId,
        assignedDate: new Date(),
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
      }
    });

    await prisma.projectAssignment.create({
      data: {
        memberId: member2.id,
        projectId: project2.projectId,
        assignedDate: new Date(),
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
      }
    });

    await prisma.projectAssignment.create({
      data: {
        memberId: member3.id,
        projectId: project1.projectId,
        assignedDate: new Date(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    });

    console.log('✅ Created sample projects and assignments');

    // Create executive committee positions
    await prisma.executiveCommittee.create({
      data: {
        memberId: member2.id,
        role: 'PRESIDENT'
      }
    });

    await prisma.executiveCommittee.create({
      data: {
        memberId: member3.id,
        role: 'SECRETARY'
      }
    });

    await prisma.executiveCommittee.create({
      data: {
        memberId: member1.id,
        role: 'VICE_PRESIDENT_EDUCATION'
      }
    });

    console.log('✅ Created executive committee positions');

    // Create sample meetings
    const meeting1 = await prisma.meeting.create({
      data: {
        title: 'Weekly Club Meeting - Communication Skills',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        startTime: new Date('2024-01-01T17:00:00Z'),
        endTime: new Date('2024-01-01T19:00:00Z'),
        description: 'Regular weekly meeting focusing on communication skills development',
        meetingType: 'WEEKLY',
        clubId: mumbaiClub.clubId,
        mocId: member2.id,
        moderatorId: member1.id,
        timekeeperId: member3.id
      }
    });

    const meeting2 = await prisma.meeting.create({
      data: {
        title: 'Executive Committee Meeting',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        startTime: new Date('2024-01-01T16:00:00Z'),
        endTime: new Date('2024-01-01T18:00:00Z'),
        description: 'Monthly executive committee planning meeting',
        meetingType: 'EXECUTIVE_COMMITTEE',
        clubId: mumbaiClub.clubId,
        presidentId: member2.id,
        secretaryId: member3.id,
        vicePresidentEducationId: member1.id
      }
    });

    console.log('✅ Created sample meetings');

    // Create membership history for members
    await prisma.membershipHistory.create({
      data: {
        memberId: member1.id,
        membershipTypeId: basicMembership.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 6 months from now
      }
    });

    await prisma.membershipHistory.create({
      data: {
        memberId: member2.id,
        membershipTypeId: premiumMembership.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 12 months from now
      }
    });

    await prisma.membershipHistory.create({
      data: {
        memberId: member3.id,
        membershipTypeId: executiveMembership.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000) // 24 months from now
      }
    });

    console.log('✅ Created membership history');

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📧 Login Credentials:');
    console.log('🔑 Super Admin: admin@bst.org / admin123 (Full access)');
    console.log('🔑 Admin: admin.mumbai@bst.org / admin456 (Admin access)');
    console.log('🔑 Member: john@example.com / user123 (Member access)');
    console.log('� Member: jane@example.com / user123 (Member access)');
    console.log('🔑 Member: alex@example.com / user123 (Member access)');
    console.log('');
    console.log('🏢 Clubs Created:');
    console.log(`📍 Mumbai Central (${mumbaiClub.clubId})`);
    console.log(`📍 Delhi Capitol (${delhiClub.clubId})`);
    console.log('');
    console.log('📅 Sample data includes:');
    console.log('• 3 Membership types • 2 Clubs • 1 Initiative');
    console.log('• 5 Users (1 SuperAdmin, 1 Admin, 3 Members)');
    console.log('• 3 Awards • 2 Events • 2 Projects • 2 Meetings');
    console.log('• Executive Committee assignments');
    console.log('• Membership history records');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
