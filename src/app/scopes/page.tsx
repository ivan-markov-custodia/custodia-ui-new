"use client";
import React from "react";
import Header from "../../components/header";
import { useAuth } from "../../components/auth-provider";
import { useRouter } from "next/navigation";
import { Shield, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const ScopesPage: React.FC = () => {
  const { user, logout, scopes } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const filteredScopes = scopes?.filter(scope =>
    scope.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categorizeScopes = (scopes: string[]) => {
    const categories: { [key: string]: string[] } = {};
    
    scopes.forEach(scope => {
      if (scope === "DEFAULT") {
        if (!categories["System"]) categories["System"] = [];
        categories["System"].push(scope);
        return;
      }
      
      if (scope.startsWith("f:")) {
        const parts = scope.substring(2).split("/");
        const category = parts[0];
        
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(scope);
      } else {
        if (!categories["Other"]) categories["Other"] = [];
        categories["Other"].push(scope);
      }
    });
    
    return categories;
  };

  const categorizedScopes = categorizeScopes(filteredScopes);
  const sortedCategories = Object.keys(categorizedScopes).sort();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const formatScopeName = (scope: string) => {
    if (scope === "DEFAULT") return "Default Access";
    if (scope.startsWith("f:")) {
      return scope.substring(2).replace(/([A-Z])/g, " $1").replace(/\//g, " → ");
    }
    return scope;
  };

  const getScopeDescription = (scope: string) => {
    if (scope === "DEFAULT") return "Basic system access permissions";
    if (scope.startsWith("f:Menu/")) return "Access to menu section";
    if (scope.startsWith("f:Company/")) return "Company management permission";
    if (scope.startsWith("f:Activity/")) return "Activity management permission";
    if (scope.startsWith("f:Expenses/")) return "Expense management permission";
    if (scope.startsWith("f:Card/")) return "Card management permission";
    if (scope.startsWith("f:Other/")) return "Additional feature access";
    return "Feature access permission";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} onLogout={logout} />
      <main className="p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Scopes & Permissions
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your account has access to {scopes?.length || 0} different scopes and permissions.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search scopes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredScopes.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? "No scopes found matching your search." : "No scopes available."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedCategories.map(category => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {expandedCategories.has(category) ? (
                        <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      {category}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        ({categorizedScopes[category].length} scopes)
                      </span>
                    </h2>
                  </button>
                  {expandedCategories.has(category) && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {categorizedScopes[category].map((scope, index) => (
                        <div key={scope} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                {formatScopeName(scope)}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {getScopeDescription(scope)}
                              </p>
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-700 dark:text-gray-300">
                                {scope}
                              </code>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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