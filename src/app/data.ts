/* tslint:disable:max-line-length */
import { FuseNavigationItem } from "@fuse/components/navigation";
import { random } from "lodash";

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: "landing",
    title: "Home",
    type: "basic",
    link: "/landing",
  },
  //ACM
  {
    id: "acm",
    title: "ACM",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",

    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "basic",
        link: "/acm/acmdashboard",
      },
      {
        id: "rule-book",
        title: "Rule Book",
        type: "collapsable",
        children: [
          {
            id: "rules",
            title: "Rules",
            type: "basic",
            link: "/acm/rule-book/rules",
          },
          {
            id: "risk",
            title: "Risk",
            type: "basic",
            link: "/acm/rule-book/risk",
          },
          {
            id: "variant",
            title: "Variant",
            type: "collapsable",
            children: [
              {
                id: "risk",
                title: "Risk",
                type: "basic",
                link: "/acm/rule-book/variant/risk",
              },
              {
                id: "rules",
                title: "Rules",
                type: "basic",
                link: "/acm/rule-book/variant/rules",
              },
            ],
          },
          {
            id: "import",
            title: "Import",
            type: "collapsable",
            children: [
              {
                id: "rules",
                title: "Import Rules",
                type: "basic",
                link: "/acm/rule-book/import/rules",
              },
              {
                id: "risk",
                title: "Import Risk",
                type: "basic",
                link: "/acm/rule-book/import/risk",
              },
            ],
          },
          {
            id: "audit-logs",
            title: "Audit Logs",
            type: "collapsable",
            children: [
              {
                id: "risk",
                title: "Risk",
                type: "basic",
                link: "/acm/rule-book/audit-logs/risk",
              },
              {
                id: "rules",
                title: "Rules",
                type: "basic",
                link: "/acm/rule-book/audit-logs/rules",
              },
            ],
          },
        ],
      },
      {
        id: "master-data",
        title: "Master Data",
        type: "collapsable",
        children: [
          {
            id: "mitigations",
            title: "Mitigations",
            type: "collapsable",
            children: [
              {
                id: "mc-control",
                title: "MC Control",
                type: "basic",
                link: "/acm/master-data/mitigations/mc-control",
              },
            ],
          },
          {
            id: "acm-owners",
            title: "ACM Owners",
            type: "basic",
            link: "/acm/master-data/acm-owners",
          },
          {
            id: "rule-type",
            title: "Rule Type",
            type: "basic",
            link: "/acm/master-data/rule-type",
          },
          {
            id: "risk-type",
            title: "Risk Type",
            type: "basic",
            link: "/acm/master-data/risk-type",
          },
          {
            id: "business-process",
            title: "Business Processes",
            type: "basic",
            link: "/acm/master-data/business-processes",
          },
          {
            id: "business-sub-process",
            title: "Business Sub Processes",
            type: "basic",
            link: "/acm/master-data/business-sub-processes",
          },
          {
            id: "org-field",
            title: "Org Field",
            type: "collapsable",
            children: [
              {
                id: "org-fields",
                title: "Org Fields",
                type: "basic",
                link: "/acm/master-data/org-field/org-fields",
              },
              {
                id: "org-names",
                title: "Org Names",
                type: "basic",
                link: "/acm/master-data/org-field/org-names",
              },
            ],
          },
        ],
      },
      {
        id: "rem",
        title: "REM",
        type: "collapsable",
        children: [
          {
            id: "rem-config",
            title: "REM Config",
            type: "basic",
            link: "/acm/rem/rem-config",
          },
          {
            id: "risk-schedule",
            title: "Risk Schedule",
            type: "basic",
            link: "/acm/rem/risk-schedule",
          },
          {
            id: "tcode-sync",
            title: "Tcode Sync",
            type: "basic",
            link: "/acm/rem/tcode-sync",
          },
        ],
      },
      {
        id: "risk-analysis",
        title: "Risk Analysis",
        type: "collapsable",
        children: [
          {
            id: "online",
            title: "Online",
            type: "basic",
            link: "/acm/risk-analysis/online/" + random(1, 100000),
          },
          {
            id: "offline",
            title: "Offline",
            type: "collapsable",
            children: [
              {
                id: "user-browser",
                title: "User Browser",
                type: "basic",
                link: "/acm/risk-analysis/offline/user-browser",
              },
              {
                id: "user-variant",
                title: "User Variant",
                type: "basic",
                link: "/acm/risk-analysis/offline/user-variant",
              },
              {
                id: "sod-analysis",
                title: "SoD Analysis",
                type: "basic",
                link: "/acm/risk-analysis/offline/sod-analysis",
              },
              {
                id: "tasks",
                title: "Tasks",
                type: "basic",
                link: "/acm/risk-analysis/offline/tasks",
              },
            ],
          },
          {
            id: "simulation",
            title: "Simulation",
            type: "collapsable",
            children: [
              {
                id: "online",
                title: "Online",
                type: "basic",
                link:
                  "/acm/risk-analysis/simulation/online/" + random(1, 100000),
              },
              {
                id: "offline",
                title: "Offilne",
                type: "basic",
                link:
                  "/acm/risk-analysis/simulation/offline/" + random(1, 100000),
              },
            ],
          },
          {
            id: "position-id",
            title: "Position Id",
            type: "collapsable",
            children: [
              {
                id: "analyisis",
                title: "Analysis",
                type: "basic",
                link:
                  "/acm/risk-analysis/position-id/analyisis/" +
                  random(1, 100000),
              },
              {
                id: "Logs",
                title: "logs",
                type: "basic",
                link:
                  "/acm/risk-analysis/simulation/offline/" + random(1, 100000),
              },
            ],
          },
          {
            id: "impact-analsis",
            title: "Impact Analysis",
            type: "basic",
            link: "/acm/risk-analysis/impact-analysis",
          },
          {
            id: "cross-system-analysis",
            title: "Cross System",
            type: "basic",
            link:
              "/acm/risk-analysis/cross-system-analysis/" + random(1, 100000),
          },
          {
            id: "cross-system-analysis1",
            title: "Cross System 1",
            type: "basic",
            link:
              "/acm/risk-analysis/cross-system-analysis1/" + random(1, 100000),
          },
          {
            id: "dashboard",
            title: "Dashboard",
            type: "basic",
            link: "/acm/risk-analysis/dashboard",
          },
          {
            id: "sfAnalysis",
            title: "Non-ABAP",
            type: "basic",
            link: "/acm/risk-analysis/sfAnalysis/" + random(1, 100000),
          },
        ],
      },
      {
        id: "reports",
        title: "Reports",
        type: "collapsable",
        children: [
          {
            id: "sod-results",
            title: "SoD Results",
            type: "basic",
            link: "/acm/reports/sod-results",
          },
          {
            id: "cross-system-analysis",
            title: "Cross System Analysis",
            type: "basic",
            link: "/acm/reports/cross-system-analysis",
          },
          {
            id: "org-level-analysis",
            title: "Org Level Analysis",
            type: "basic",
            link: "/acm/reports/org-level-analysis",
          },
          {
            id: "org-analysis-dashboard",
            title: "Org Analysis Dashboard",
            type: "basic",
            link: "/acm/reports/org-analysis-dashboard",
          },
          {
            id: "user-report",
            title: "User Report",
            type: "basic",
            link: "/acm/reports/user-report",
          },
          {
            id: "risk-execution",
            title: "Risk Execution",
            type: "basic",
            link: "/acm/reports/risk-execution",
          },
          {
            id: "rule-execution",
            title: "Rule Execution",
            type: "basic",
            link: "/acm/reports/rule-execution",
          },
          {
            id: "tcode-execution",
            title: "Tcode Execution",
            type: "basic",
            link: "/acm/reports/tcode-execution",
          },
          {
            id: "risk-exe-execution",
            title: "Risk Exe Summary",
            type: "basic",
            link: "/acm/reports/risk-exe-summary",
          },
        ],
      },
    ],
  },
  //PAM
  {
    id: "pam",
    title: "PAM",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",
    children: [
      {
        id: "pam-dashboard",
        title: "PAM Dashboard",
        type: "basic",
        link: "/pam/requests/pam-dashboard",
      },
      {
        id: "requests",
        title: "Requests",
        type: "collapsable",
        children: [
          {
            id: "my-requests",
            title: "My Requests",
            type: "basic",
            link: "/pam/requests/my-requests",
          },
          {
            id: "my-approvals",
            title: "My Approvals",
            type: "basic",
            link: "/pam/requests/my-approvals",
          },
          {
            id: "my-reviews",
            title: "My Reviews",
            type: "basic",
            link: "/pam/requests/my-reviews",
          },
        ],
      },
      {
        id: "reports",
        title: "Reports",
        type: "collapsable",
        children: [
          {
            id: "master-data",
            title: "Master Data",
            type: "basic",
            link: "/pam/reports/master-data",
          },
          {
            id: "request-pivot",
            title: "Request Pivot",
            type: "basic",
            link: "/pam/reports/request-pivot",
          },
          {
            id: "all-requests",
            title: "All Requests",
            type: "basic",
            link: "/pam/reports/all-requests",
          },
          {
            id: "audit-logs",
            title: "Audit Logs",
            type: "basic",
            link: "/pam/reports/audit-logs",
          },
        ],
      },
      {
        id: "setup",
        title: "Setup",
        type: "collapsable",
        children: [
          {
            id: "privileges",
            title: "Privileges",
            type: "basic",
            link: "/pam/setup/privileges",
          },
          {
            id: "review-rule",
            title: "Review Rule",
            type: "basic",
            link: "/pam/setup/review-rule",
          },
          {
            id: "reasons",
            title: "Reasons",
            type: "basic",
            link: "/pam/setup/reasons",
          },
          {
            id: "synchronize",
            title: "Synchronize",
            type: "collapsable",
            link: "/pam/setup/synchronize",
            children: [
              {
                id: "schedulers",
                title: "Schedulers",
                type: "basic",
                link: "/pam/setup/synchronize/schedulers",
              },
              {
                id: "jobs",
                title: "Jobs",
                type: "basic",
                link: "/pam/setup/synchronize/jobs",
              },
            ],
          },
        ],
      },
    ],
  },
  //CAM
  {
    id: "cam",
    title: "CAM",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",
    children: [
      {
        id: "dashboard",
        title: "CAM Dashboard",
        type: "basic",
        link: "/cam/cam-dashboard",
      },
      {
        id: "requests",
        title: "Requests",
        type: "collapsable",
        children: [
          {
            id: "single",
            title: "Single",
            type: "basic",
            link: "cam/requests/single",
          },
          {
            id: "multiple",
            title: "Multiple",
            type: "basic",
            link: "cam/requests/multiple",
          },
          {
            id: "non-abap",
            title: "Non-ABAP",
            type: "basic",
            link: "cam/requests/non-abap",
          },
        ],
      },
      {
        id: "self-service",
        title: "Self Service",
        type: "collapsable",
        link: "/central-users/central-users-db/dashboard",
        children: [
          {
            id: "unlock",
            title: "Unlock",
            type: "basic",
            link: "cam/self-service/single",
          },
          {
            id: "reset-password",
            title: "Reset Password",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "requests",
            title: "Requests",
            type: "basic",
            link: "cam/self-service/requests",
          },
        ],
      },
      {
        id: "workflow",
        title: "Workflow",
        type: "collapsable",
        children: [
          {
            id: "workflow",
            title: "Workflow",
            type: "basic",
            link: "cam/workflow/workflow",
          },
          {
            id: "my-requests",
            title: "My Requests",
            type: "basic",
            link: "cam/workflow/my-requests",
          },
          {
            id: "my-approvals",
            title: "My approvals",
            type: "basic",
            link: "cam/workflow/my-approvals",
          },
          {
            id: "node",
            title: "node",
            type: "basic",
            link: "cam/workflow/node",
          },
          {
            id: "workflow",
            title: "My approvals",
            type: "basic",
            link: "cam/workflow/workflow",
          },
          {
            id: "all-requests",
            title: "All Requests",
            type: "basic",
            link: "cam/workflow/all-requests",
          },
          {
            id: "audit-logs",
            title: "Audit Logs",
            type: "basic",
            link: "cam/workflow/audit-logs",
          },
        ],
      },
      {
        id: "arc",
        title: "ARC",
        type: "collapsable",
        children: [
          {
            id: "arc-job",
            title: "ARC Job",
            type: "basic",
            link: "cam/arc/single",
          },
          {
            id: "review-jobs",
            title: "Reset Password",
            type: "basic",
            link: "cam/self-service/multiple",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        type: "collapsable",
        children: [
          {
            id: "sap-system",
            title: "SAP System",
            type: "basic",
            link: "cam/arc/single",
          },
          {
            id: "user-restrictions",
            title: "User Restrictions",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "role-catalogue",
            title: "User Restrictions",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "requests-params",
            title: "Request Params",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "user-provision-field",
            title: "User Provision Field",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "approval-delegation",
            title: "Approval Delegation",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "org-structures",
            title: "Org Structures",
            type: "basic",
            link: "cam/self-service/multiple",
          },
          {
            id: "role-sync",
            title: "Role Sync",
            type: "basic",
            link: "cam/self-service/multiple",
          },
        ],
      },
    ],
  },
  //Central User
  {
    id: "central-users",
    title: "Central User",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",
    children: [
      {
        id: "central-users-db",
        title: "Central Users",
        type: "collapsable",
        children: [
          {
            id: "dashboard",
            title: "Dashboard",
            type: "basic",
            link: "/central-users/central-users-db/dashboard",
          },
          {
            id: "scheduled-task",
            title: "Scheduled Task",
            type: "basic",
            link: "/central-users/central-users-db/scheduled-task",
          },
          {
            id: "central-user-report",
            title: "Central User Report",
            type: "basic",
            link: "/central-users/central-users-db/central-user-report",
          },
          {
            id: "central-user-pivot-report",
            title: "Central User Pivot Report",
            type: "basic",
            link: "/central-users/central-users-db/central-user-pivot-report",
          },
          {
            id: "jobs",
            title: "Jobs",
            type: "basic",
            link: "/central-users/central-users-db/jobs",
          },
          {
            id: "inactive-user",
            title: "Inactive User",
            type: "collapsable",
            children: [
              {
                id: "inactive-user-dashboard",
                title: "Inactive User Dashboard",
                type: "basic",
                link: "/central-users/central-users-db/inactive-user/inactive-user-dashboard",
              },
              {
                id: "central-user-lock-parameters",
                title: "Central User Lock Parameters",
                type: "basic",
                link: "/central-users/central-users-db/inactive-user/central-user-lock-parameters",
              },
              {
                id: "jobs",
                title: "Jobs",
                type: "basic",
                link: "/central-users/central-users-db/inactive-user/jobs",
              },
            ],
          },
        ],
      },
      {
        id: "system-license-management",
        title: "System License Management ",
        type: "collapsable",
        children: [
          {
            id: "dashboard",
            title: "Dashboard",
            type: "basic",
            link: "/central-users/system-license-management/dashboard",
          },
          {
            id: "system-license-info",
            title: "System License Info",
            type: "basic",
            link: "/central-users/system-license-management/system-license-info",
          },
          {
            id: "license-rules",
            title: "License Rules",
            type: "basic",
            link: "/central-users/system-license-management/license-rules",
          },
          {
            id: "license-indirect-usage",
            title: "License Indirect Usage",
            type: "basic",
            link: "/central-users/system-license-management/license-indirect-usage",
          },
          {
            id: "license-management",
            title: "License Management",
            type: "basic",
            link: "/central-users/system-license-management/license-management",
          },
          {
            id: "jobs",
            title: "Jobs",
            type: "basic",
            link: "/central-users/system-license-management/jobs",
          },
          {
            id: "pivot-report",
            title: "Pivot Report",
            type: "basic",
            link: "/central-users/system-license-management/pivot-report",
          },
        ],
      },
    ],
  },
  //Admin
  {
    id: "administration",
    title: "Administration",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",

    children: [
      {
        id: "communication",
        title: "Communication",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "email",
            title: "Email",
            type: "collapsable",
            children: [
              {
                id: "settings",
                title: "Settings",
                type: "basic",
                link: "/admin/communication/email/settings",
              },
              {
                id: "logs",
                title: "Logs",
                type: "basic",
                link: "/admin/communication/email/logs",
              },
            ],
          },
          {
            id: "template",
            title: "Template",
            type: "basic",
            link: "/admin/communication/template",
          },
          {
            id: "logo",
            title: "Logo",
            type: "basic",
            link: "/admin/communication/logo",
          },
        ],
      },

      {
        id: "authentication",
        title: "Authentication",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "users",
            title: "Users",
            type: "basic",
            link: "/admin/users",
          },
          {
            id: "ldap",
            title: "LDAP",
            type: "basic",
            link: "/admin/ldap",
          },
          {
            id: "roles",
            title: "Roles",
            type: "basic",
            link: "/admin/roles",
          },
        ],
      },
      {
        id: "reporting-units",
        title: "Reporting Units",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "sapsystem",
            title: "Systems",
            type: "basic",
            link: "/admin/reporting-units/sap-system",
          },
          {
            id: "reporting",
            title: "Reporting",
            type: "basic",
            link: "/admin/reporting-units/reporting",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "application-config",
            title: "Application Config",
            type: "basic",
            link: "/admin/settings/application-config",
          },
          {
            id: "audit-logs",
            title: "Audit Logs",
            type: "basic",
            link: "/admin/settings/audit-logs",
          },
        ],
      },
      {
        id: "event-viewer",
        title: "Event Viewer",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "logs",
            title: "Logs",
            type: "basic",
            link: "/admin/event-viewer/logs",
          },
          {
            id: "clear-logs",
            title: "Clear Logs",
            type: "basic",
            link: "/admin/event-viewer/clear-logs",
          },
        ],
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/admin/audit-logs",
      },
      {
        id: "utilities",
        title: "Utilities",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "ruleset-conversion",
            title: "Ruleset Conversion",
            type: "collapsable",
            children: [
              {
                id: "grc-ruleset",
                title: "GRC Ruleset",
                type: "basic",
                link: "/admin/utilities/ruleset-conversion/grc-ruleset",
              },
              {
                id: "csi-query",
                title: "CSI Query",
                type: "basic",
                link: "/admin/utilities/ruleset-conversion/csi-query",
              },
            ],
          },
        ],
      },
      {
        id: "data-sync",
        title: "Data Sync",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "data-extractor",
            title: "Data Extractor",
            type: "collapsable",
            children: [
              {
                id: "profiles",
                title: "Profiles",
                type: "basic",
                link: "/admin/data-sync/data-extractor/profiles",
              },
              {
                id: "jobs",
                title: "Jobs",
                type: "basic",
                link: "/admin/data-sync/data-extractor/jobs",
              },
              {
                id: "scheduler",
                title: "Scheduler",
                type: "basic",
                link: "/admin/data-sync/data-extractor/scheduler",
              },
            ],
          },
        ],
      },
    ],
  },
  //General
  {
    id: "general",
    title: "General",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",
    children: [
      {
        id: "export-results",
        title: "Export Results",
        type: "basic",
        link: "/general/export-results",
      },
      {
        id: "user-dashboard",
        title: "User Dashboard",
        type: "basic",
        link: "/general/user-dashboard",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        type: "basic",
        link: "/general/admin-dashboard",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        type: "basic",
        link: "/general/admin-dashboard",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        type: "basic",
        link: "/general/admin-dashboard",
      },
    ],
  },
];
export const compactNavigation = defaultNavigation;
export const futuristicNavigation = defaultNavigation;
export const horizontalNavigation = defaultNavigation;
