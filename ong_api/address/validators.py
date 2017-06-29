import re

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


CEP_MASK = re.compile(r'\d{2}\.\d{3}-\d{3}')

def validate_zipcode(zipcode=None):
    """
    Check if ZIP Code number is valid.

    Parameters
    ---------
    zipcode: string

    Returns
    -------
    True if ZIP Code number is valid. Otherwise raise a ValidationError.
    """

    if CEP_MASK.match(cep) is not None:
        return True

    raise ValidationError(_('Invalid C.E.P. number.'))
