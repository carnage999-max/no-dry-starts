#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'no_dry_starts.settings')
django.setup()

from manufacturers.models import Manufacturer
from manufacturers.serializers import ManufacturerListSerializer, ManufacturerSerializer
import json

mfr = Manufacturer.objects.first()
if mfr:
    print("Manufacturer found:", mfr.name)
    
    print("\nManufacturerListSerializer (for list views):")
    list_ser = ManufacturerListSerializer(mfr)
    print(json.dumps(list_ser.data, indent=2))
    
    print("\n\nManufacturerSerializer (for detail views):")
    detail_ser = ManufacturerSerializer(mfr)
    print(json.dumps(detail_ser.data, indent=2))
    
    print("\n\nList response size:", len(json.dumps(list_ser.data)))
    print("Detail response size:", len(json.dumps(detail_ser.data)))
else:
    print("No manufacturers found!")
