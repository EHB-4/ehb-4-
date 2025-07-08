// Supabase removed from project. This script is deprecated.

const { createClient } = require('@supabase/supabase-js');
const config = require('../app/config/config.json');

console.log('🚀 Setting up Supabase Tables...');

// Initialize Supabase
const supabase = createClient(config.supabase.url, config.supabase.anon_key);

async function setupTables() {
  try {
    console.log('\n📊 Creating database tables...');

    // Create users table
    console.log('  🔍 Creating users table...');
    const { error: usersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR UNIQUE NOT NULL,
          name VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          role VARCHAR DEFAULT 'USER',
          sql_level INTEGER DEFAULT 0,
          sql_status VARCHAR DEFAULT 'FREE',
          ai_score INTEGER DEFAULT 0,
          fraud_score DECIMAL DEFAULT 0,
          complaint_count INTEGER DEFAULT 0,
          badge_nft_hash VARCHAR,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (usersError) {
      console.log('  ℹ️ Users table:', usersError.message);
    } else {
      console.log('  ✅ Users table created/verified');
    }

    // Create jobs table
    console.log('  🔍 Creating jobs table...');
    const { error: jobsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS jobs (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title VARCHAR NOT NULL,
          company VARCHAR NOT NULL,
          location VARCHAR NOT NULL,
          salary DECIMAL NOT NULL,
          description TEXT,
          requirements TEXT[],
          skills TEXT[],
          status VARCHAR DEFAULT 'ACTIVE',
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (jobsError) {
      console.log('  ℹ️ Jobs table:', jobsError.message);
    } else {
      console.log('  ✅ Jobs table created/verified');
    }

    // Create wallets table
    console.log('  🔍 Creating wallets table...');
    const { error: walletsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS wallets (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
          balance DECIMAL DEFAULT 0,
          currency VARCHAR DEFAULT 'USD',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (walletsError) {
      console.log('  ℹ️ Wallets table:', walletsError.message);
    } else {
      console.log('  ✅ Wallets table created/verified');
    }

    // Create transactions table
    console.log('  🔍 Creating transactions table...');
    const { error: transactionsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS transactions (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
          type VARCHAR NOT NULL,
          amount DECIMAL NOT NULL,
          description TEXT,
          status VARCHAR DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (transactionsError) {
      console.log('  ℹ️ Transactions table:', transactionsError.message);
    } else {
      console.log('  ✅ Transactions table created/verified');
    }

    // Create candidates table
    console.log('  🔍 Creating candidates table...');
    const { error: candidatesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS candidates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR NOT NULL,
          email VARCHAR UNIQUE NOT NULL,
          phone VARCHAR,
          sql_level INTEGER DEFAULT 0,
          experience INTEGER,
          skills TEXT[],
          preferred_location VARCHAR,
          expected_salary DECIMAL,
          status VARCHAR DEFAULT 'ACTIVE',
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (candidatesError) {
      console.log('  ℹ️ Candidates table:', candidatesError.message);
    } else {
      console.log('  ✅ Candidates table created/verified');
    }

    // Create placements table
    console.log('  🔍 Creating placements table...');
    const { error: placementsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS placements (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
          candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
          job_title VARCHAR NOT NULL,
          candidate_name VARCHAR NOT NULL,
          company VARCHAR NOT NULL,
          salary DECIMAL NOT NULL,
          status VARCHAR DEFAULT 'PENDING',
          placement_date TIMESTAMP,
          start_date TIMESTAMP,
          end_date TIMESTAMP,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (placementsError) {
      console.log('  ℹ️ Placements table:', placementsError.message);
    } else {
      console.log('  ✅ Placements table created/verified');
    }

    // Create products table
    console.log('  🔍 Creating products table...');
    const { error: productsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR NOT NULL,
          description TEXT,
          price DECIMAL NOT NULL,
          image_url VARCHAR,
          category VARCHAR,
          stock INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (productsError) {
      console.log('  ℹ️ Products table:', productsError.message);
    } else {
      console.log('  ✅ Products table created/verified');
    }

    // Create orders table
    console.log('  🔍 Creating orders table...');
    const { error: ordersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS orders (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          total_amount DECIMAL NOT NULL,
          status VARCHAR DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    });

    if (ordersError) {
      console.log('  ℹ️ Orders table:', ordersError.message);
    } else {
      console.log('  ✅ Orders table created/verified');
    }

    console.log('\n✅ All tables setup completed!');
    console.log('\n📋 Created Tables:');
    console.log('- users');
    console.log('- jobs');
    console.log('- wallets');
    console.log('- transactions');
    console.log('- candidates');
    console.log('- placements');
    console.log('- products');
    console.log('- orders');

    console.log('\n🚀 Your Supabase database is now ready!');
    console.log('\n💡 Next steps:');
    console.log('1. Test the database connection');
    console.log('2. Start using the new database client');
    console.log('3. Deploy your application');
  } catch (error) {
    console.error('❌ Table setup failed:', error.message);
    console.error('Error details:', error.stack);
  }
}

setupTables();
