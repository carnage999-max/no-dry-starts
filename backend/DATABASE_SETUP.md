# Database Setup Guide

## Development (SQLite)

By default, the application uses SQLite for local development.

### Setup
```bash
# Activate virtual environment
.\env\Scripts\activate

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## Production (PostgreSQL / Neon)

### Neon Database Setup

1. **Create a Neon Database**
   - Go to [https://neon.tech](https://neon.tech)
   - Create a new project
   - Copy your connection string

2. **Update Environment Variables**
   
   Create or update `.env` file in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   DEBUG=False
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   DJANGO_SECRET_KEY=your-secure-secret-key-here
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

### Other PostgreSQL Providers

The application supports any PostgreSQL database. Just set the `DATABASE_URL` environment variable:

```env
# Format
DATABASE_URL=postgresql://username:password@hostname:port/database

# Examples:
# AWS RDS
DATABASE_URL=postgresql://admin:password@mydb.xxxxx.us-east-1.rds.amazonaws.com:5432/nds

# Heroku Postgres
DATABASE_URL=postgresql://user:password@ec2-xx-xx-xx-xx.compute-1.amazonaws.com:5432/dbname

# Local PostgreSQL
DATABASE_URL=postgresql://postgres:password@localhost:5432/no_dry_starts
```

## Migration Commands

```bash
# Create new migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show migration status
python manage.py showmigrations

# Rollback migration
python manage.py migrate app_name migration_number

# SQL for migration (without applying)
python manage.py sqlmigrate app_name migration_number
```

## Database Backup & Restore

### SQLite
```bash
# Backup
cp db.sqlite3 backup_$(date +%Y%m%d).sqlite3

# Restore
cp backup_20250105.sqlite3 db.sqlite3
```

### PostgreSQL
```bash
# Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20250105.sql
```

## Switching from SQLite to PostgreSQL

1. Export data from SQLite:
   ```bash
   python manage.py dumpdata --exclude auth.permission --exclude contenttypes > data.json
   ```

2. Update `.env` with PostgreSQL `DATABASE_URL`

3. Run migrations on PostgreSQL:
   ```bash
   python manage.py migrate
   ```

4. Import data:
   ```bash
   python manage.py loaddata data.json
   ```

## Connection Pooling (Production)

For production, configure connection pooling in `settings.py`:

```python
DATABASES = {
    'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,  # Connection pool timeout (10 minutes)
        conn_health_checks=True,  # Check connection health
    )
}
```

## Troubleshooting

### Connection Issues
- Verify `DATABASE_URL` format is correct
- Check firewall rules allow connections
- Ensure SSL mode is set correctly for cloud databases

### Migration Conflicts
- Delete migration files (not `__init__.py`)
- Run `python manage.py makemigrations` again
- Or use `--merge` flag: `python manage.py makemigrations --merge`

### Permission Errors
- Ensure database user has CREATE, ALTER, DROP permissions
- For Neon, the provided user has full permissions by default
