const bcrypt = require('bcryptjs');
const mongoose = require("mongoose"); 
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Service = require('../models/service.model');
const Category = require('../models/category.model');
const Qualification = require('../models/qualification.model');
const Consultant = require('../models/consultant.model'); 
const Location = require('../models/location.model'); 

//Seed roles
const seedRoles = async () => {
  const roles = [
    { name: process.env.ADMIN },
    { name: process.env.ENTREPRENEUR },
    { name: process.env.CONSULTANT},
    { name: process.env.BUSINESS_OWNER }
  ];

  const RoleDocs = await Role.insertMany(roles);

  if (!RoleDocs || RoleDocs.length === 0) {
    throw new Error("Roles seeding failed");
  }

  console.log("Roles Seeded:", RoleDocs);
  return RoleDocs; 
};

// Seed services
const seedServices = async () => { 
  const services = [
      { 
          name: process.env.FINANCIAL_PLANNING, 
          description: process.env.FINANCIAL_PLANNING_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.FINANCIAL_PLANNING_AMOUNT || 0.00)
      },
      {  
          name: process.env.LOCATION_MARKET_ANALYSIS, 
          description: process.env.LOCATION_MARKET_ANALYSIS_DESCRIPTION , 
          amount: mongoose.Types.Decimal128.fromString(process.env.LOCATION_MARKET_ANALYSIS_AMOUNT || 0.00)
      },
      { 
          name: process.env.SALES_REVENUE_OPTIMIZATION, 
          description: process.env.SALES_REVENUE_OPTIMIZATION_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.SALES_REVENUE_OPTIMIZATION_AMOUNT || 0.00)
      },
      { 
          name: process.env.CONSULTANCY, 
          description: process.env.CONSULTANCY_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.CONSULTANCY_AMOUNT || 0.00)
      }
  ];
  
  const serviceDocs = await Service.insertMany(services);
  serviceDocs ? console.log('Services Seeded:') : console.error('Services Seeding Error:'); 
  return serviceDocs;
};

// Seed categories
const seedCategories = async () => {

  const categories = [
    { _id: "64a8b56d57b2d63a3a6c8f1d", name: "Healthcare" },
    { _id: "64a8b56d57b2d63a3a6c8f1e", name: "Food & Beverage" },
    { _id: "64a8b56d57b2d63a3a6c8f1f", name: "Retail & Consumer Goods" },
    { _id: "64a8b56d57b2d63a3a6c8f20", name: "Education" },
    { _id: "64a8b56d57b2d63a3a6c8f21", name: "Financial Services" },
    { _id: "64a8b56d57b2d63a3a6c8f22", name: "Public Services" },
    { _id: "64a8b56d57b2d63a3a6c8f23", name: "Auto & Transport" },
    { _id: "64a8b56d57b2d63a3a6c8f24", name: "Community & Leisure" },
    { _id: "64a8b56d57b2d63a3a6c8f25", name: "Technology & Electronics" },
    { _id: "64a8b56d57b2d63a3a6c8f26", name: "Fashion & Beauty" },
    { _id: "64a8b56d57b2d63a3a6c8f27", name: "Miscellaneous" }
  ];
  
  const categoryDocs = await Category.insertMany(categories);
  categoryDocs ? console.log('Categories Seeded:') : console.error('Categories Seeding Error:'); 
};

//Seed locations with data
const seedLocations = async () => {
  
  const locations =[
  new Location(
  {
    name: 'Wardiaan',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 2 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 3 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 5 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 1 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 6 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 1 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 2 }   
    ]
  }),
  new Location({
    name: 'Mahatet el raml',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 9 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 80 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 239 }, 
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 295 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 55 },   
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 86 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 47 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 106 }, 
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 47 },   
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 12 },  
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 13 }   
    ]
  }),
  new Location({
    name: 'Ibrahmiya',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 12 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 16 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 43 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 26 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 9 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 11 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 30 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 1 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 1 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 5 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 26 }
    ]
  }),
  new Location({
    name: 'Moharam bek',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 3 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 8 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 6 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 12 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 5 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 6 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 3 }
    ]
  }),
  new Location({
    name: 'El mandara',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 9 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 81 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 243 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 297 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 59 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 96 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 54 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 106 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 48 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 14 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 13 }
    ]
  }),
  new Location({
    name: 'El agami',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 11 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 86 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 263 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 308 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 62 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 106 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 64 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 107 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 48 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 18 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 14 }
    ]
  }),
  new Location({
    name: 'Sporting',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 8 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 30 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 23 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 43 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 17 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 5 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 18 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 3 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 2 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 2 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 1 }
    ]
  }),
  new Location({
    name: 'Al mansheya',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 8 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 42 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 27 },
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 5 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 8 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 18 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 6 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 13 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 6 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 1 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 6 }
    ]
  }),
  new Location({
    name: 'Smouha',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 18 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 55 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 81 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 42 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 66 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 29 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 31 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 17 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 4 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 7 },
      { categoryId: "64a8b56d57b2d63a3a6c8f27", count: 2 }
    ]
  }),
  new Location({
    name: 'Sedi beshr',
    businesses: [
      { categoryId: "64a8b56d57b2d63a3a6c8f20", count: 6 },
      { categoryId: "64a8b56d57b2d63a3a6c8f21", count: 46 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1d", count: 34 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1e", count: 64 },
      { categoryId: "64a8b56d57b2d63a3a6c8f1f", count: 47 },
      { categoryId: "64a8b56d57b2d63a3a6c8f23", count: 18 },
      { categoryId: "64a8b56d57b2d63a3a6c8f22", count: 16 },
      { categoryId: "64a8b56d57b2d63a3a6c8f25", count: 8 },
      { categoryId: "64a8b56d57b2d63a3a6c8f24", count: 2 },
      { categoryId: "64a8b56d57b2d63a3a6c8f26", count: 24 }
    ]
  })
];
  
  const locationDocs = await Location.insertMany(locations);
  locationDocs ? console.log('Locations Seeded:') : console.error('Locations Seeding Error:'); 
};
   
// Seed admin
const seedAdmin = async () => { 
  console.log("ENV ADMIN VALUE:", process.env.ADMIN);
  const adminRole = await Role.findOne({ name: process.env.ADMIN })

  if (!adminRole) {
    throw new Error("Admin role not found!");
  }

  const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, Number(process.env.CRYPTO_KEY));

  const adminDoc = await User.create(
      { rolesId: adminRole._id,
        fullName: process.env.ADMIN_USERNAME, 
        email: process.env.ADMIN_EMAIL, 
        password: hashedPassword , 
        phoneNumber: process.env.ADMIN_PHONE_NUMBER
      }
    );

  adminDoc ? console.log('Admin Seeded:') : console.error('Admin Seeding Error:'); 
};

// Seed qualifications
const seedQualifications = async () => {
  const qualifications = [
    { title: process.env.MBA, description: process.env.MBA_DESCRIPTION},
    { title: process.env.CERTIFIED_FINANCIAL_ANALYST, description: process.env.CERTIFIED_FINANCIAL_ANALYST_DESCRIPTION },
    { title: process.env.MARKETING_EXPERT, description: process.env.MARKETING_EXPERT_DESCRIPTION }
  ];
  const qualDocs = await Qualification.insertMany(qualifications);
  qualDocs ? console.log('Qualifications Seeded:') : console.error('Qualifications Seeding Error:'); 
  return qualDocs;
};

// Seed consultant with user account
const seedConsultants = async () => {
  const services = await Service.find();
  const qualifications = await Qualification.find(); 
  const consultantRole = await Role.findOne({name: process.env.CONSULTANT}); 
 
  const consultants = [process.env.CONSULTANT_1, process.env.CONSULTANT_2, process.env.CONSULTANT_3];
  for ( let i = 0; i < consultants.length; i++ ){ 
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, Number(process.env.CRYPTO_KEY));

    const consultantUser = await User.create(
      {
          fullName: consultants[i],
          email: `${consultants[i].replace(" ", "")}.consultant@bedaytak.com`, 
          password: hashedPassword,
          rolesId: consultantRole._id
        }
      ); 
  
    const ConsultantDocs = await Consultant.create(
        {
          salary: mongoose.Types.Decimal128.fromString(process.env.DEFAULT_SALARY || 0.00) ,
          bonus:  mongoose.Types.Decimal128.fromString(process.env.DEFAULT_BONUS || 0.00),
          userId: consultantUser._id, 
          servicesIds: [services[0]._id, services[1]._id], 
          qualificationsIds: [qualifications[1]._id], 
          experienceYears: 5
        }
      ); 

    ConsultantDocs ? console.log(`Consultant Seeded Named : ${consultantUser.fullName}`) : console.error(`Consultants Seeding Error: Named : ${consultantUser.fullName}`); 
  };
};
 
// Main function to seed all data
const seedDatabase = async () => { 
  try {
      await seedRoles(); 
      await seedServices();
      await seedQualifications();
      await seedCategories();
      await seedLocations();
      await seedConsultants();
      await seedAdmin();
 
      console.log("Seeding Completed!");
  } catch (error) { 
      console.error("Seeding Failed!", error);
  } 
};

module.exports = { seedDatabase, User, Role, Service, Category, Qualification, Consultant } ;
