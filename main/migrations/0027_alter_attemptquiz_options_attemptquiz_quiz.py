# Generated by Django 4.0.4 on 2022-09-25 18:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_attemptquiz_right_ans'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='attemptquiz',
            options={'verbose_name_plural': '14. Attempted Quiz'},
        ),
        migrations.AddField(
            model_name='attemptquiz',
            name='quiz',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quiz'),
        ),
    ]
