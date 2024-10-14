// roles.js - Define the visibility and access for each role
export const rolesPermissions = {
    student: {
      visibility: ['ownComplaints', 'generalInfo'],
      access: ['fileComplaint', 'useSOS', 'viewComplaintStatus'],
    },
    institutionalCommittee: {
      visibility: ['sosAlerts', 'complaintsWithinInstitution'],
      access: ['respondSOS', 'updateStatus', 'manageComplaints', 'escalateIssues'],
    },
    universityCommittee: {
      visibility: ['institutionComplaints'],
      access: ['manageComplaints', 'escalateIssues'],
    },
    regionalCommittee: {
      visibility: ['districtComplaints'],
      access: ['overseeInstitution', 'handleEscalations', 'regionalReporting'],
    },
    stateCommittee: {
      visibility: ['stateComplaints'],
      access: ['overseeRegional', 'stateLevelReporting'],
    },
    nationalCommittee: {
      visibility: ['nationWideComplaints'],
      access: ['overseeState', 'interveneCriticalCases'],
    },
    ugcOfficial: {
      visibility: ['nationWideData', 'complianceReports'],
      access: ['monitorCompliance', 'accessAnalytics'],
    },
    moeOfficial: {
      visibility: ['nationWideData', 'highLevelReports'],
      access: ['decisionMakingData'],
    },
  };
  