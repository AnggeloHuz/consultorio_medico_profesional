import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiesChart({keys, data, label}) {
    return (
      <Pie
        data={{
          labels: keys,
          datasets: [
            {
              label: "Total de Pacientes",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)", // Rojo
                "rgba(255, 206, 86, 0.6)", // Amarillo
                "rgba(54, 162, 235, 0.6)", // Azul
                "rgba(75, 192, 192, 0.6)", // Cian
                "rgba(153, 102, 255, 0.6)", // Púrpura
                "rgba(255, 159, 64, 0.6)", // Naranja
                "rgba(255, 99, 132, 0.6)", // Rojo claro
                "rgba(201, 203, 207, 0.6)", // Gris claro
                "rgba(255, 20, 147, 0.6)", // Rosa profundo
                "rgba(30, 144, 255, 0.6)", // Azul profundo
                "rgba(255, 105, 180, 0.6)", // Rosa
                "rgba(0, 128, 0, 0.6)", // Verde
                "rgba(255, 215, 0, 0.6)", // Dorado
                "rgba(128, 0, 128, 0.6)", // Púrpura oscuro
                "rgba(255, 69, 0, 0.6)", // Rojo anaranjado
                "rgba(135, 206, 235, 0.6)", // Azul cielo
                "rgba(255, 140, 0, 0.6)", // Naranja oscuro
                "rgba(100, 149, 237, 0.6)", // Azul maíz
                "rgba(34, 139, 34, 0.6)", // Verde bosque
                "rgba(255, 20, 147, 0.6)", // Rosa fuerte
                "rgba(75, 0, 130, 0.6)", // Índigo
              ],

              borderColor: [
                "rgba(255, 99, 132, 1)", // Rojo
                "rgba(255, 206, 86, 1)", // Amarillo
                "rgba(54, 162, 235, 1)", // Azul
                "rgba(75, 192, 192, 1)", // Cian
                "rgba(153, 102, 255, 1)", // Púrpura
                "rgba(255, 159, 64, 1)", // Naranja
                "rgba(255, 99, 132, 1)", // Rojo claro
                "rgba(201, 203, 207, 1)", // Gris claro
                "rgba(255, 20, 147, 1)", // Rosa profundo
                "rgba(30, 144, 255, 1)", // Azul profundo
                "rgba(255, 105, 180, 1)", // Rosa
                "rgba(0, 128, 0, 1)", // Verde
                "rgba(255, 215, 0, 1)", // Dorado
                "rgba(128, 0, 128, 1)", // Púrpura oscuro
                "rgba(255, 69, 0, 1)", // Rojo anaranjado
                "rgba(135, 206, 235, 1)", // Azul cielo
                "rgba(255, 140, 0, 1)", // Naranja oscuro
                "rgba(100, 149, 237, 1)", // Azul maíz
                "rgba(34, 139, 34, 1)", // Verde bosque
                "rgba(255, 20, 147, 1)", // Rosa fuerte
                "rgba(75, 0, 130 ,1)", // Índigo
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
                display: true,
                text: label,
                color: "#000000",
                font: {weight: 'bold', size: 16}
            }
          }
        }}
      />
    );
}