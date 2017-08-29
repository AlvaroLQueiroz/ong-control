import math

from django.conf import settings
from rest_framework import pagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param


class Pagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'pages': {
                'count': self.page.paginator.num_pages,
                'actual': self.page.number,
                'first': self.get_page_url(1),
                'previous': self.get_page_url(self.page.number - 1),
                'next': self.get_page_url(self.page.number + 1),
                'last': self.get_page_url(self.page.paginator.num_pages),
                'range': self.get_page_range()
            },
            'result_count': self.page.paginator.count,
            'results': data
        })

    def get_page_range(self):
        start = self.page.number - math.floor(
            settings.REST_FRAMEWORK .get('PAGINATOR_SIZE', 5) / 2) - 1
        end = self.page.number + \
            math.ceil(settings.REST_FRAMEWORK .get('PAGINATOR_SIZE', 5) / 2)
        page_range = []
        for page in self.page.paginator.page_range[max(start, 0):end]:
            page_range.append({
                'active': True if page == self.page.number else False,
                'number': page,
                'link': self.get_page_url(page)
            })

        return page_range

    def get_page_url(self, number):
        if self.page.number == number or number not in self.page.paginator.page_range:
            return None
        else:
            return {self.page_query_param: number}
