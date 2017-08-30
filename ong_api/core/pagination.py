import math

from django.conf import settings
from django.core.paginator import InvalidPage
from django.utils import six

from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination, _positive_int
from rest_framework.response import Response


class Pagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'page': {
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

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                return _positive_int(
                    request.query_params[self.page_size_query_param],
                    strict=False,
                    cutoff=self.max_page_size
                )
            except (KeyError, ValueError):
                pass

        return self.page_size

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        page_size = self.get_page_size(request)
        if page_size == 0:
            page_size = queryset.count()

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=six.text_type(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)
