from django import forms
from .models import Video

class VideoForm(forms.ModelForm):
	class Meta:
		model = Video
		fields = ['title', 'file']
    # title = forms.CharField(max_length=50)
    # file = forms.FileField()
