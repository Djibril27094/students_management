# Generated by Django 4.0.4 on 2022-09-22 11:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_rename_questions_quizquestion_question'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coursequiz',
            options={'verbose_name_plural': '13. Course Quiz'},
        ),
        migrations.AddField(
            model_name='coursequiz',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]
