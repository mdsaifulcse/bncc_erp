export default [
  {path: '/departments', name: 'departments', meta: {parent: 'Employee', subparent: 'Settings', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Departments'}, component: require('@/components/hr/department/index').default},

  {path: '/office-schedule', name: 'officeScheduleList', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Office Office Shedule'}, component: require('@/components/hr/officeSchedule/index').default},
  {path: '/office-schedule/:id/edit', name: 'officeScheduleEdit', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Office Schedule Edit'}, component: require('@/components/hr/officeSchedule/edit').default},

  {path: '/attendance/create', name: 'attendanceCreate', meta: {parent: 'Attendance', submenu: 'true', breadcrumb: 'New Attendance'}, component: require('@/components/hr/attendance/create').default},
  {path: '/attendance', name: 'attendance', meta: {parent: 'Attendance', submenu: 'true', breadcrumb: 'Attendance List'}, component: require('@/components/hr/attendance/index').default},
  {path: '/attendance/show', name: 'showAttendance', meta: {parent: 'Attendance', submenu: 'true', breadcrumb: 'Attendance Show'}, component: require('@/components/hr/attendance/show').default},
  {path: '/attendance/edit', name: 'editAttendance', meta: {parent: 'Attendance', submenu: 'true', breadcrumb: 'Attendance Show'}, component: require('@/components/hr/attendance/edit').default},

  {path: '/performance/create', name: 'createPerformance', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Create Performance',breadcrumb2: 'null'},component: require('@/components/hr/employee/performance/create').default},
  {path: '/performance', name: 'performance',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Performance',breadcrumb2: 'null'},component: require('@/components/hr/employee/performance/index').default},
  {path: '/performance/:id/edit',name: 'editPerformance',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Edit Performance',breadcrumb2: 'null'},component: require('@/components/hr/employee/performance/edit').default},
  {path: '/performance/:id',name: 'showPerformance',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Show Performance',breadcrumb2: 'null'},component: require('@/components/hr/employee/performance/Show').default},

  {path: '/award/create', name: 'createAward', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Create Award',breadcrumb2: 'null'},component: require('@/components/hr/employee/award/create').default},
  {path: '/award', name: 'award',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Award',breadcrumb2: 'null'},component: require('@/components/hr/employee/award/index').default},
  {path: '/award/:id/edit',name: 'editAward',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Edit Award',breadcrumb2: 'null'},component: require('@/components/hr/employee/award/edit').default},
  {path: '/award/:id',name: 'showAward',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Show Award',breadcrumb2: 'null'},component: require('@/components/hr/employee/award/Show').default},

  {path: '/punishment/create', name: 'createPunishment', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Create Punishment',breadcrumb2: 'null'},component: require('@/components/hr/employee/punishment/create').default},
  {path: '/punishment', name: 'punishment',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Punishment',breadcrumb2: 'null'},component: require('@/components/hr/employee/punishment/index').default},
  {path: '/punishment/:id/edit',name: 'editPunishment',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Edit Punishment',breadcrumb2: 'null'},component: require('@/components/hr/employee/punishment/edit').default},
  {path: '/punishment/:id',name: 'showPunishment',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Show Punishment',breadcrumb2: 'null'},component: require('@/components/hr/employee/punishment/Show').default},

  {path: '/termination/create', name: 'createTermination', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Create Termination',breadcrumb2: 'null'},component: require('@/components/hr/employee/termination/create').default},
  {path: '/termination', name: 'termination',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Termination',breadcrumb2: 'null'},component: require('@/components/hr/employee/termination/index').default},
  {path: '/termination/:id/edit',name: 'editTermination',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Edit Termination',breadcrumb2: 'null'},component: require('@/components/hr/employee/termination/edit').default},
  {path: '/termination/:id',name: 'showTermination',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Show Termination',breadcrumb2: 'null'},component: require('@/components/hr/employee/termination/Show').default},

  {path: '/transfer/create', name: 'createTransfer', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Create Transfer',breadcrumb2: 'null'},component: require('@/components/hr/employee/transfer/create').default},
  {path: '/transfer', name: 'transfer',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Transfer',breadcrumb2: 'null'},component: require('@/components/hr/employee/transfer/index').default},
  {path: '/transfer/:id/edit',name: 'editTransfer',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Edit Transfer',breadcrumb2: 'null'},component: require('@/components/hr/employee/transfer/edit').default},
  {path: '/transfer/:id',name: 'showTransfer',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Show Transfer',breadcrumb2: 'null'},component: require('@/components/hr/employee/transfer/Show').default},
  /* HR Report Route */
  {path: '/find-employee', name: 'findEmployee',meta: {parent: 'HR Reports', breadcrumb: 'Find Employee',breadcrumb2: 'null'},component: require('@/components/hr/reports/findEmployee').default},
  {path: '/find-performance', name: 'findPerformance',meta: {parent: 'HR Reports', breadcrumb: 'Find Performance',breadcrumb2: 'null'},component: require('@/components/hr/reports/findPerformance').default},
  {path: '/find-award', name: 'findAward',meta: {parent: 'HR Reports', breadcrumb: 'Find Award',breadcrumb2: 'null'},component: require('@/components/hr/reports/findAward').default},
  {path: '/find-punishment', name: 'findPunishment',meta: {parent: 'HR Reports', breadcrumb: 'Find Punishment',breadcrumb2: 'null'},component: require('@/components/hr/reports/findPunishment').default},
  {path: '/find-transfer', name: 'findTransfer',meta: {parent: 'HR Reports', breadcrumb: 'Find Transfer',breadcrumb2: 'null'},component: require('@/components/hr/reports/findTransfer').default},
  {path: '/find-termination', name: 'findTermination',meta: {parent: 'HR Reports', breadcrumb: 'Find Termination',breadcrumb2: 'null'},component: require('@/components/hr/reports/findTermination').default},
  {path: '/find-attendance', name: 'findAttendance',meta: {parent: 'HR Reports', breadcrumb: 'Find Attendance',breadcrumb2: 'null'},component: require('@/components/hr/reports/findAttendance').default},

]
