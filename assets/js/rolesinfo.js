import userTypes from "assets/js/users";

const rolesinfo = [
  {
    title: "Granjero",
    id: userTypes.granjero.id,
    route: '/granjero',
    options: [{ to: "" }]
  },
  {
    title: "Veterinario",
    id: userTypes.veterinario.id,
    route: '/veterinario/configuracion',
    options: [
      {
        title: 'Configuracion',
        icon: 'mdi-chart-bubble',
        to: '/veterinario/configuracion'
      },
      {
        title: 'Incidencia',
        icon: 'mdi-calendar',
        to: '/veterinario/incidencia'
      },
      {
        title: 'Seguimiento',
        icon: 'mdi-calendar',
        to: '/veterinario/seguimiento'
      },
      {
        title: 'Monitoreo de Incidentes',
        icon: 'mdi-calendar',
        to: '/veterinario/monitoreo'
      }
    ]
  },
  {

  }
];

export default rolesinfo;
