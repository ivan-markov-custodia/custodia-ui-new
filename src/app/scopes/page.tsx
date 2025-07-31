"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import { useAuth } from "../../components/auth-provider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ScopesPage: React.FC = () => {
  const { user, logout, jwtToken } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    // Extract scopes from JWT token or fetch from API
    const fetchScopes = async () => {
      try {
        // For now, we'll use mock scopes based on the example you provided
        // In a real implementation, you might decode the JWT or fetch from an API
        const mockScopes = [
          "DEFAULT",
          "f:CashExpense",
          "f:Employee/MerchantGroupsAllowImport",
          "f:App/DisableFirstOnboarding",
          "f:Card/ApplePay",
          "f:Menu/PersonalCharges",
          "f:Expenses/PrivateExpense",
          "f:Menu/MerchantCategoriesControl",
          "f:HelpDesk",
          "f:Activity/Edit/DatesAndBudget/SkipWorkflow",
          "f:Menu/ExpenseAccountMapping",
          "f:OpenReceiptURLs",
          "f:Menu/Employees",
          "f:ExpensesAsDefault",
          "f:Company/MerchantGroups/Add",
          "f:Company/Activity/TypesEditor/Categories",
          "f:Menu/NetSuiteSetup",
          "f:Menu/DecisionTables",
          "f:Activities",
          "f:Zone/ActivitiesHistory",
          "f:Accounting/NetSuite",
          "f:Company/Policy/Travel",
          "f:Other/Marketing",
          "f:Expenses/UserReview/AllowInvalid",
          "f:Bttr/TransferToCibus",
          "f:Menu/Classes",
          "f:Menu/SpendByActivitiesAnalytics",
          "f:Expenses/PrivateView",
          "f:Activity/SplitBudget",
          "f:Menu/EmployeesHelpDesk",
          "f:IT/Security",
          "f:Other/Activity01",
          "f:Employee/BlockMerchants/Edit",
          "f:Menu/IccFiles",
          "f:Company/Policy/Approval",
          "f:Activity/3rdParty",
          "f:Company/Policy/PolicyManager",
          "f:Budget/disableParentValidation",
          "f:Activity/CreatePermission",
          "f:Menu/TripRequest",
          "f:Zone/Themes",
          "f:Zone/PrivateTrxV2",
          "f:Company/Dashboard",
          "f:User/TempPassCode",
          "f:Team",
          "f:Company/Admin/Products",
          "f:Activity/ActiveForCurrencies",
          "f:DistanceMatrix",
          "f:Other/Entertainment",
          "f:Activity/Recurring",
          "f:Menu/Budgets",
          "f:Zone/Restaurants",
          "f:Other/Green",
          "f:Menu/TeamOutOfPocketExpenses",
          "f:Other/General",
          "f:Web/ForceMobileVerification",
          "f:Activity/ChangeBudget/anyBudget",
          "f:Menu/TeamEmployeeStatements",
          "f:Menu/SynchronizationErrors",
          "f:App/DisableThirdOnboarding",
          "f:Accounting/Priority",
          "f:Menu/EmployeeCostCenterMapping",
          "f:Reimbursements/MassPayment",
          "f:Menu/Expenses",
          "f:Company/Policy/PerDiemAndMeals",
          "f:Other/Coupon",
          "f:Activity/GroupPay",
          "f:Activity/ExportAsCsv",
          "f:Company/Finance/Simulator",
          "f:Expenses/Investigation",
          "f:Other/Lot",
          "f:Menu/ExploreAnalytics",
          "f:Mail/Send/Attachments",
          "f:Expense/Split/ByVAT",
          "f:Activity/Manager/ForceMyTeamSearch",
          "f:languages",
          "f:Menu/BudgetMappingViewer",
          "f:Menu/ActivityTemplates",
          "f:Expense/Split/ByPrepayments",
          "f:Company/Admin",
          "f:Activity/BulkInProgress",
          "f:User/UseEmail",
          "f:LinkedUserAccount/edit",
          "f:Company/Policy/selfApprovalPolicy",
          "f:Menu/SpendMappingSimulator",
          "f:Card/ShipToCustodia",
          "f:Card/NotifyStateChange",
          "f:ActivityTypes/SpendBenefitFilters",
          "f:Activity/HideLimits/Skip",
          "f:Employee/ChangeOauthStatus",
          "f:Activity/RecurringBulkAllocationChangeReq/onWorkflowComplete_v2",
          "f:manager/employee/editCostCenters",
          "f:Expenses/LinkToAnyActivity",
          "f:Expenses/ShowBusinessPartners",
          "f:Menu/PolicyManager",
          "f:Other/Israel",
          "f:manager/employee/editClasses",
          "f:Company/MerchantGroupsCreate",
          "f:Expenses/24h",
          "f:Activity/MccInfo",
          "f:Zone/InfoPages",
          "f:Menu/PurchaseOrdersCategoryMapping",
          "f:Activity/CreatePermission/App",
          "f:Company/Activity/TypesEditor/RolloverBudget",
          "f:Activity/ChangeHistory",
          "f:BulkActivity/RecreateMissingActivities",
          "f:Employee/editDelegates",
          "f:Company/MerchantGroupsMembers/Add",
          "f:Company/Finance/DecisionTables",
          "f:MealsBenefit",
          "f:PolicyManager/Receipt/DataExtraction",
          "f:Other/Meals",
          "f:Menu/OrgTeams",
          "f:Other/ECommerce",
          "f:Cards/NewCardsIssuance",
          "f:Other/ZoneTemplate",
          "f:Delegates/Delegate",
          "f:Expenses/ShowApprovalCode",
          "f:Other/Activity011",
          "f:Other/Well",
          "f:HelpDesk/UserInfo",
          "f:Menu/CompanyStatements",
          "f:Expenses/ShowBillingPeriodTotal",
          "f:Card/PhysicalCard",
          "f:Company/Activity/TypesEditor/DailyLimit",
          "f:Menu/PlatformEmployeesHelpDesk",
          "f:Transactions",
          "f:Activity/LockByAdmin",
          "f:ClientMeeting",
          "f:Other/Eating",
          "f:Card/GooglePay",
          "f:Analytics/Budget",
          "f:Platform/UpdateLicense",
          "f:BlockCompanyMerchants",
          "f:Languages/Edit",
          "f:Company/Activity/TypesEditor/TransactionLimit",
          "f:Menu/ProjectTeamMapping",
          "f:Menu/BusinessPartners",
          "f:Menu/CostCenters",
          "f:GroupPayActivity",
          "f:Analytics/Basic",
          "f:Company/Activity/TypesEditor/CardPresent",
          "f:Activity/CardPresent",
          "f:Company/Finance/Admin",
          "f:Menu/BenefitsUtilization",
          "f:User/UseUserName",
          "f:HelpDesk/CompanyInfo",
          "f:Card/VirtualCard",
          "f:Menu/DistanceMatrix",
          "f:Menu/CostCenterHierarchy",
          "f:App/Consolidate",
          "f:Company/Activity/TypesEditor/RecurringPayment",
          "f:App/OutOfPocketAdvancedSelection",
          "f:Other/PO",
          "f:Employee/MerchantGroupsAllowEdit",
          "f:Organize/Issues/Notification",
          "f:Other/Parking",
          "f:Menu/ManageTemplates",
          "f:manager/employee/editDetails",
          "f:Menu/newCompany",
          "f:Other/HomeInternet",
          "f:Expenses/Receipt/TaxValidation",
          "f:Menu/NewOutOfPocket",
          "f:Menu/Products",
          "f:Subscriptions",
          "f:Activity/ATM",
          "f:Menu/MonthlySpendAnalytics",
          "f:Accounting/QuickBooks",
          "f:Other/SharedSpace",
          "f:Company/Admin/Profiles",
          "f:Menu/CustomerTeamMapping",
          "f:Menu/TeamEmployees",
          "f:Expenses/Receipt/ReportMissing",
          "f:Other/Dining",
          "f:Menu/PlatformHighSpendDetection",
          "f:Menu/TeamDashboard",
          "f:Menu/SpendByCategoriesAnalytics",
          "f:Expenses/EditSubsidiary",
          "f:Activity/Creation/AddAttachments",
          "f:Activity/UpdateExpired",
          "f:HelpDesk/Companies/Dashboard",
          "f:Activity/TemplateSearch",
          "f:PrivateZone",
          "f:Activity/BoundToCard",
          "f:Employee/MerchantGroupsMembers/Add",
          "f:Budget/EndActivities",
          "f:Employee/BlockMerchants",
          "f:Activity/3rdParty/Cibus",
          "f:Other/Category2",
          "f:Subsidiary/ManagementTeam",
          "f:Menu/EmployeeReimbursements",
          "f:Support/Enrollment",
          "f:PolicyManager/SubsidiaryTabs",
          "f:Employee/MerchantGroups",
          "f:3rdPartyService/BttrClubs",
          "f:Menu/EmployeeProjectMapping",
          "f:Menu/Activities",
          "f:Activity/Edit/BAExpenseType",
          "f:Activity/ChangeGlAccount",
          "f:Expenses/Receipt/MissingFields",
          "f:Activity/RecurringPayment",
          "f:Activity/Recurring/BiWeekly",
          "f:Other/IT",
          "f:Expenses/MassUpdate",
          "f:Activity/AddAttachments",
          "f:Other/Office",
          "f:Menu/TeamHierarchyMapping",
          "f:Activity/BulkCreation",
          "f:Budget/BypassMerchantRestriction",
          "f:Other/PiggyBank",
          "f:Menu/MissingReceipts",
          "f:Other/Coffee",
          "f:TenantUsageReport",
          "f:Other",
          "f:EmergencyBudget",
          "f:Other/Activity010",
          "f:Bttr/ShowOnlySupportedMerchants",
          "f:Analytics/MerchantSpend",
          "f:Analytics/MerchantSpend/TopX",
          "f:Company/Policy/SpendCategory",
          "f:App/AdvancedReciptEditing",
          "f:Activity/EditNonEditable",
          "f:App/Settings/ShowSendReceiptByEmail",
          "f:Budget/GenerateDefaultBudgets",
          "f:Menu/ClientMeetingRequest",
          "f:Activity/MergeBudget",
          "f:Other/ZoneLine",
          "f:Expenses/Edit/markPersonalSelf",
          "f:Budget/SeeDetails",
          "f:Keywords/Vendor",
          "f:HelpDesk/CompanyUsers",
          "f:Menu/MerchantBlockList",
          "f:Other/Assistance",
          "f:Bttr/Market",
          "f:Menu/EmployeeTeamMapping",
          "f:Company/Activity/TypesEditor/Merchants",
          "f:Activity/ActiveForCountryCodes",
          "f:Other/CashBack",
          "f:Accounting/Dynamics",
          "f:Project/TeamMapping",
          "f:Activity/ChangeCurrency",
          "f:Company/Activity/TypesEditor/Tags",
          "f:Activity/ImportCredit",
          "f:Other/MobilePhoneBill",
          "f:Company/Activity/TypesEditor/AdvancedSettings",
          "f:Expenses/Split",
          "f:manager/employee/orderCard",
          "f:Expenses/View/Detailed",
          "f:Company/IDM",
          "f:Card/UnbindActivities",
          "f:App/DisableSecondOnboarding",
          "f:Card/OrderCards",
          "f:Other/OfficeSupplies",
          "f:Other/Transportation",
          "f:Support",
          "f:Zone/FoodZone",
          "f:Company/Finance/ClarificationPolicy",
          "f:Menu/RolesSpendProfiles",
          "f:Trip",
          "f:Analytics/Tips",
          "f:HelpDesk/redirectToUserDashboardButton",
          "f:EmployeePayments",
          "f:Menu/BudgetUtilization",
          "f:Activity/BalanceUpdate",
          "f:User/UserNameIsPII",
          "f:Menu/PurchaseOrdersImport",
          "f:User/emailRequired",
          "f:Zone/PrivateToBusiness",
          "f:Company/Policy/ReceiptRequirements",
          "f:Menu/Subsidiaries",
          "f:Operations/ManagedWorfklow",
          "f:Card/3rdPartyToken",
          "f:Keywords/Product",
          "f:Company/Statements",
          "f:Activity/ChangeBudget/App",
          "f:Dwolla/MassPayment",
          "f:BulkActivity/HardReset",
          "f:Activity/AdvancedSettings",
          "f:Menu/SecurityEvents",
          "f:Menu/MyStatements",
          "f:Company/Policy/activityRematchPolicy",
          "f:Expenses/EditAccountingDetails",
          "f:Menu/NewSpendRequest",
          "f:Activity/CreateRequest",
          "f:benefit-card",
          "f:Menu/Adjustments",
          "f:App/PrivateToBusiness",
          "f:Zone/Confetti",
          "f:Menu/ChartOfAccounts",
          "f:Analytics/ServerSide/Explorer",
          "f:Expenses/Transfer",
          "f:EmployeeBenefits/View",
          "f:Company/Activity/TypesEditor",
          "f:Support/Security",
          "f:Card/ShipInternationally",
          "f:Menu/CompanyProfile",
          "f:Menu/DynamicsSetup",
          "f:manager/employee/editCustomers",
          "f:Menu/MerchantGroupsForBP",
          "f:Cards/NewCardIssuance",
          "f:Company/Expenses",
          "f:Company/Policy/ActivityPermission",
          "f:Analytics/Explore",
          "f:Other/HomeOffice",
          "f:Employee/ShowExternalId",
          "f:Menu/EmployeeRoleMapping",
          "f:Menu/TeamBudgets",
          "f:GroupPayActivity/UseBuffer",
          "f:Other/TeamBuilding",
          "f:Company/Policy/CurrencyConfiguration",
          "f:Menu/OutOfPocketExpenses",
          "f:Menu/QuickBooksSetup",
          "f:Support/Payments",
          "f:Employee/MerchantGroups/Add",
          "f:Other/BasicOfficeSupplies",
          "f:Other/Auto",
          "f:Card/OptInToCibus",
          "f:Other/Communication",
          "f:DebugInfo",
          "f:Expenses/Reassign/Activities",
          "f:Menu/HighSpendDetection",
          "f:Activity/Edit",
          "f:Other/Conference",
          "f:manager/employee/editDelegates",
          "f:Company/Finance/ExpensePolicy",
          "f:Bttr/Shopify",
          "f:HelpDesk/Companies/Employees",
          "f:BusinessExpense",
          "f:Activity/UpdateSharedActivity",
          "f:CustomPeriodSelection",
          "f:LinkedUserAccount/view",
          "f:Other/Financial",
          "f:Expenses/Split/AcrossOwners",
          "f:Bttr/PrivateTrxV2",
          "f:Activity/RequireReceipt",
          "f:Expenses/Payment",
          "f:Menu/BenefitsTransactions",
          "f:Company/Activity/TypesEditor/Classifications",
          "f:Company/Activity/TypesEditor/GeneralSettings",
          "f:Expenses/UserReview",
          "f:Menu/ReportCards",
          "f:Activity/LockedByDefault",
          "f:Menu/NewSpendPermission",
          "f:Project/EmployeeMapping",
          "f:Expenses/LightClassification",
          "f:PurchaseOrders/Edit",
          "f:Merchants/updateCategory",
          "f:CustomKnowledgeBase",
          "f:Activity/LockAll",
          "f:Menu/MerchantRecords",
          "f:Company/Policy/BufferPolicy",
          "f:ImportFiles",
          "f:Zone/JustEat",
          "f:createSubBudget",
          "f:Menu/Cards",
          "f:Support/Billing",
          "f:Expenses/ChangeAfterApprove",
          "f:Other/Supermarket",
          "f:Activity/MultiCurrency",
          "f:Menu/CompanyDashboard",
          "f:Team/Notifications",
          "f:Other/Gym",
          "f:Menu/ActivityBudgetRules",
          "f:Other/TollRoadSubscription",
          "f:Company/Policy/JustificationRequirements",
          "f:Menu/Projects",
          "f:CashExpense/NeedsAgreement",
          "f:OutOfPocket/Edit/PendingApproval",
          "f:Expenses/ShowPartialAuth",
          "f:Activity/StartWithBudget",
          "f:Company/Admin/PurchaseOrders",
          "f:Other/FoodZoneMultiLine",
          "f:manager/employee/editTeams",
          "f:Menu/PrioritySetup",
          "f:Activity/OutOfPocket",
          "f:Activity/HideLimits",
          "f:Company/Admin/BankAccounts",
          "f:HelpDesk/Companies",
          "f:Expenses/Edit/markPersonal",
          "f:Menu/MerchantGroups",
          "f:Other/Gifts",
          "f:Card/ExpeditedDelivery",
          "f:Onboarding/Issuance/SelectCard",
          "f:OutOfPocket/Cancel/PendingApproval",
          "f:Menu/EmployeeClassMapping",
          "f:Company/Admin/Projects",
          "f:Cards/ChangeModes",
          "f:Menu/Vendors",
          "f:Company/Admin/Dictionary",
          "f:Other/Category1",
          "f:Menu/PlatformCompaniesHelpDesk",
          "f:Menu/TopTenMerchants",
          "f:Menu/LoginEvents",
          "f:Zone/Activities",
          "f:Employee/MerchantGroupsAllowDelete",
          "f:Company/Policy/CardLimits",
          "f:Other/BirthdayGift",
          "f:Activity/Edit/Type",
          "f:Menu/Dictionary",
          "f:InfoPages",
          "f:Menu/Companies",
          "f:Budget/create",
          "f:ManageBudget",
          "f:Other/Wellness",
          "f:Company/Activity/TypesEditor/CreateNewType",
          "f:Activity/MassUpdate",
          "f:Other/GiftCard",
          "f:Analytics/ServerSide",
          "f:Company/Admin/Subsidiaries",
          "f:Data/Export/Anonymous",
          "f:Other/home",
          "f:Activity/ForceCostCenter",
          "f:Company/MerchantGroups",
          "f:manager/employee/editRoles",
          "f:Other/Food",
          "f:Menu/InfoPages",
          "f:light",
          "f:Menu/TenantMapping",
          "f:Menu/ReportTransactions",
          "f:Company/Activity/TypesEditor/Photos",
          "f:Expenses",
          "f:Employee/editAddress",
          "f:Menu/TeamActivities",
          "f:merchantHints",
          "f:Activity/UploadCSV",
          "f:Expenses/hasExtraExplanationFeature",
          "f:Menu/Customers",
          "f:Other/Training",
          "f:HelpDesk/NameSearch",
          "f:EmployeeBenefits/Admin",
          "f:manager/employee/editProjects",
          "f:App/Settings/howSmartHowEasy",
          "f:Expenses/ViewByBillingDate",
          "f:HelpDesk/Companies/Edit",
          "f:Support/DecisionTables",
          "f:Expenses/Edit",
          "f:Company/Policy/OutOfPocketPolicy",
          "f:NotificationSetup",
          "f:Other/DigitalGood",
          "f:Company/Finance/ReceiptPolicy",
          "f:Activity/AutoLockOnBufferUsage",
          "f:Menu/EmployeeCustomerMapping",
          "f:Activity/ChangeBudget",
          "f:Expenses/AttachReceipt",
          "f:Activity/AutoExtend",
          "f:Mail/Send",
          "f:MissingReceipts",
          "f:PurchaseOrders/Link"
        ];
        setScopes(mockScopes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scopes:", error);
        setLoading(false);
      }
    };

    fetchScopes();
  }, [user, router, jwtToken]);

  const filteredScopes = scopes.filter(scope =>
    scope.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizeScopes = (scopes: string[]) => {
    const categories: { [key: string]: string[] } = {};
    
    scopes.forEach(scope => {
      if (scope === "DEFAULT") {
        if (!categories["Default"]) categories["Default"] = [];
        categories["Default"].push(scope);
      } else if (scope.startsWith("f:")) {
        const parts = scope.substring(2).split("/");
        const category = parts[0];
        if (!categories[category]) categories[category] = [];
        categories[category].push(scope);
      } else {
        if (!categories["Other"]) categories["Other"] = [];
        categories["Other"].push(scope);
      }
    });

    return categories;
  };

  const categorizedScopes = categorizeScopes(filteredScopes);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} onLogout={logout} />
      <main className="p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            User Scopes & Permissions
          </h1>
          
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="mb-4 flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search scopes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredScopes.length} of {scopes.length} scopes
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg text-gray-600 dark:text-gray-400">Loading scopes...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(categorizedScopes).map(([category, categoryScopes]) => (
                <div key={category} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {category} ({categoryScopes.length})
                  </h2>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {categoryScopes.map((scope) => (
                      <div
                        key={scope}
                        className="rounded-md bg-gray-50 px-3 py-2 text-sm font-mono text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {scope}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScopesPage;