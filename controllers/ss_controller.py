# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import http
from odoo.http import request

class SafarSutraController(http.Controller):

    @http.route('/safarsutra/dashboard', type='http', auth='user', website=True)
    def ss_dashboard(self, **kwargs):
        """
        Renders the personalized SafarSutra travel planning dashboard
        for the currently authenticated user.
        """
        # Fetch all trips belonging to the logged-in user
        trips = request.env['ss.trip'].search([('user_id', '=', request.env.user.id)])
        
        # Render the custom dashboard QWeb template
        return request.render('safar_sutra.ss_dashboard_template', {
            'trips': trips
        })

    @http.route('/trip/<int:trip_id>/share', type='http', auth='public', website=True)
    def ss_public_itinerary(self, trip_id, **kwargs):
        """
        Renders a public read-only shared view of a specific travel itinerary.
        Does not require logging in.
        """
        # Browse the trip using sudo() to bypass access rules for public visitors
        trip = request.env['ss.trip'].sudo().browse(trip_id)
        
        # If the trip does not exist in the database, return Odoo's 404 page
        if not trip or not trip.exists():
            return request.not_found()
            
        # Render the public itinerary QWeb template
        return request.render('safar_sutra.ss_public_itinerary', {
            'trip': trip
        })
