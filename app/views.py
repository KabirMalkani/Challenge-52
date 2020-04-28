from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Video
from .forms import VideoForm


def index(request):
    return render(request, 'index.html')


def upload(request):
    if request.method == 'POST':
        form = VideoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            print("valid")

    videos = list(Video.objects.values())
    for vid in videos:
        vid['file'] = 'media/' + vid['file']

    print("here")
    return JsonResponse({'videos': videos})
    # return render(request, 'videos.html', {'videos': videos, 'form': form})


def videolist(request):
    videos = list(Video.objects.values())
    for vid in videos:
        vid['file'] = 'media/' + vid['file']
    
    return JsonResponse({'videos': videos})


def deletevideos(request):
    Video.objects.all().delete()
    return JsonResponse({})

      