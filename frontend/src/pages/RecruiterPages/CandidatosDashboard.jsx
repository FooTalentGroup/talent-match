import React, { useState, useEffect } from "react";
import { NavLink, useParams, Navigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const CandidatosDashboard = () => {
  useCambiarTitulo("DetalleVacante");

  const { id } = useParams();
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navItems = [
    { title: "Descripción", path: `/reclutador/Descriptionvacancy/${id}` },
    {
      title: "Candidatos en proceso",
      path: `/reclutador/ver/candidatos/${id}`,
    },
  ];

  useEffect(() => {
    const obtenerVacante = async () => {
      try {
        const response = await axiosConfig.get(`/vacancies/${id}`);
        if (!response.data) {
          setError("No se encontró la vacante con ese ID.");
        } else {
          setVacante(response.data);
        }
      } catch (error) {
        console.error(
          "Error al obtener vacantes:",
          error.response?.data || error.message
        );
        setError("Error al cargar la información de la vacante");
      } finally {
        setLoading(false);
      }
    };

    obtenerVacante();
  }, [id]);

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;
  if (!vacante)
    return <p className="pt-24 text-center">Vacante no encontrada.</p>;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-medium text-[#152D53] mb-10">
        {vacante.nombre} {vacante.puesto}
      </h1>
      <div className="relative mb-1 pb-2">
        <div className="flex space-x-6 border-b border-gray-300">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `pb-2 relative font-medium transition-colors duration-200 ${
                  isActive ? "text-black" : "text-black hover:text-[#535353]"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.title}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#366FB6] rounded-full"></span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <ApplicationsTable />
      </div>
    </div>
  );
};

export default CandidatosDashboard;
