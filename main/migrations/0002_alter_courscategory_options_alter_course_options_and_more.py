# Generated by Django 4.0.4 on 2022-06-20 01:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='courscategory',
            options={'verbose_name_plural': '2. Cours Categories'},
        ),
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name_plural': '3. Courses'},
        ),
        migrations.AlterModelOptions(
            name='student',
            options={'verbose_name_plural': '4. Students'},
        ),
        migrations.AlterModelOptions(
            name='teacher',
            options={'verbose_name_plural': '1. Teachers'},
        ),
        migrations.RenameField(
            model_name='teacher',
            old_name='adresse',
            new_name='Skills',
        ),
    ]
