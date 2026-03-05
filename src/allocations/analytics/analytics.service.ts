import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AnalyticsService {

  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  async getAnalytics() {

    const supabase = this.supabaseService.getClient();

    // -------------------------
    // MOST ALLOCATED EMPLOYEES
    // -------------------------

    const { data: mostAllocated } = await supabase
      .from('allocations')
      .select('employee_id')
    
    const employeeCounts = {};

    mostAllocated?.forEach(row => {
      employeeCounts[row.employee_id] =
        (employeeCounts[row.employee_id] || 0) + 1;
    });

    const mostAllocatedEmployees = Object.entries(employeeCounts)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 5)
      .map(([employee_id, count]) => ({
        employee_id,
        allocations: count
      }));


    // -------------------------
    // UNDERUTILIZED EMPLOYEES
    // -------------------------

    const { data: employees } = await supabase
      .from('employees')
      .select('*');

    const underutilized = employees?.filter(emp => {
      const allocations = employeeCounts[emp.id] || 0;
      return allocations === 0;
    });


    // -------------------------
    // SKILL SHORTAGES
    // -------------------------

    const { data: projectSkills } = await supabase
      .from('projects')
      .select('required_skill');

    const skillDemand = {};

    projectSkills?.forEach(p => {
      skillDemand[p.required_skill] =
        (skillDemand[p.required_skill] || 0) + 1;
    });

    const shortages = Object.entries(skillDemand)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, demand]) => ({
        skill,
        demand
      }));


    // -------------------------
    // TEAM UTILIZATION
    // -------------------------

    const totalEmployees = employees?.length || 0;
    const activeEmployees = Object.keys(employeeCounts).length;

    const teamUtilization = {
      total_employees: totalEmployees,
      active_employees: activeEmployees,
      utilization_rate:
        totalEmployees > 0
          ? activeEmployees / totalEmployees
          : 0
    };


    return {
      most_allocated_employees: mostAllocatedEmployees,
      underutilized_employees: underutilized,
      skill_shortages: shortages,
      team_utilization: teamUtilization
    };
  }
}