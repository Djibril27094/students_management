# Generated by Django 4.0.4 on 2022-09-07 00:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_courseassignement'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CourseAssignement',
            new_name='StudentAssignement',
        ),
    ]
