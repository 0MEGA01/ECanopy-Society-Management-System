import api from './api';

export const superAdminService = {
    getResidents: async (societyId) => {
        const response = await api.get(`/super-admin/societies/${societyId}/residents`);
        return response.data;
    },
    getUsersBySociety: async (societyId) => {
        const response = await api.get(`/super-admin/societies/${societyId}/users`);
        return response.data;
    },
    promoteToSecretary: async (userId) => {
        const response = await api.post(`/super-admin/promote-secretary`, { userId });
        return response.data;
    },
    createSecretary: async (data) => {
        const response = await api.post(`/super-admin/create-secretary`, data);
        return response.data;
    }
};
