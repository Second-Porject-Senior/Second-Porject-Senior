require('dotenv').config({ path: '../utils/.env' });
const { sequelize, Estate, Category } = require('../database/index.js');

const seedEstates = async () => {
  try {
    // Fetch categories from the database
    const categories = await Category.findAll();

    // Map categories to their respective estates
    const estates = [
      {
        title: 'Modern Studio Apartment',
        description: 'A cozy and modern studio apartment in the heart of the city.',
        price: 1200.00,
        location: 'Downtown',
        bathrooms: 1,
        bedrooms: 1,
        area: 45.0,
        image_url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2023/07/Modern-small-studio-apartment-interior-design-by-Decorilla.jpg',
        category_id: categories.find(c => c.name === 'Studios and 1 Bedrooms').id,
      },
      {
        title: 'Luxury Apartment',
        description: 'A spacious luxury apartment with stunning city views.',
        price: 2500.00,
        location: 'Uptown',
        bathrooms: 2,
        bedrooms: 3,
        area: 120.0,
        image_url: 'https://example.com/apartment.jpg',
        category_id: categories.find(c => c.name === 'Apartments').id,
      },
      {
        title: 'Elegant Villa',
        description: 'A beautiful villa with a private pool and garden.',
        price: 5000.00,
        location: 'Suburbs',
        bathrooms: 4,
        bedrooms: 5,
        area: 300.0,
        image_url: 'https://example.com/villa.jpg',
        category_id: categories.find(c => c.name === 'Villas and Houses').id,
      },
      {
        title: 'Penthouse with Panoramic Views',
        description: 'A luxurious penthouse with breathtaking panoramic views.',
        price: 8000.00,
        location: 'City Center',
        bathrooms: 3,
        bedrooms: 4,
        area: 200.0,
        image_url: 'https://example.com/penthouse.jpg',
        category_id: categories.find(c => c.name === 'Penthouses').id,
      },
      {
        title: 'Daily Rental Building',
        description: 'A fully furnished building available for daily rentals.',
        price: 300.00,
        location: 'Tourist Area',
        bathrooms: 1,
        bedrooms: 1,
        area: 50.0,
        image_url: 'https://example.com/daily-rental.jpg',
        category_id: categories.find(c => c.name === 'Daily Rental Buildings').id,
      },
      {
        title: 'Beachfront Vacation Home',
        description: 'A stunning vacation home with direct beach access.',
        price: 4000.00,
        location: 'Coastal Area',
        bathrooms: 3,
        bedrooms: 4,
        area: 180.0,
        image_url: 'https://example.com/vacation-home.jpg',
        category_id: categories.find(c => c.name === 'Vacation Homes').id,
      },
    ];

    // Seed estates into the database
    await sequelize.sync({ force: false }); // Ensure the database is ready
    await Estate.bulkCreate(estates);
    console.log('Estates seeded successfully!');
  } catch (error) {
    console.error('Error seeding estates:', error);
  } finally {
    await sequelize.close();
  }
};

seedEstates();