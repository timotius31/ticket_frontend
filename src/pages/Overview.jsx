import Slider from '../components/Slider';

export default function Overview() {
  return (
    <>
      <Slider />

      <div className="page">
        <div style={{ maxWidth: 1100, margin: '40px auto' }}>
          <h1>A Trace Of US: Performance Art Masa Depan Cerah 2026</h1>

          <p>
            The Art Performance is an annual event organized by Masa Depan Cerah High School as a platform for students to develop, express, and showcase their talents and creativity. The school believes that every student possesses unique potential that can be nurtured through art, making the Art Performance an important platform to support that growth.

This year, the Art Performance will feature a musical drama titled A Trace of Us (ATROUS). Carrying themes of family, drama, comedy, and romance, A Trace of Us aims to provide an experience that is not only entertaining but also filled with valuable lessons. The performance serves as an opportunity for students to take part in a large-scale collaborative production, involving acting, music, dance, and stage technical work.

More than just entertainment, the Art Performance through A Trace of Us (ATROUS) is designed to enhance artistic skills, foster teamwork, and cultivate a sense of responsibility in organizing a major event. It also offers the audience a chance to reflect on the positive messages conveyed through art while appreciating the talents of the younger generation.

Beyond its role as a medium for self-development, this Art Performance is also part of the Practical Examination for Grade 12 students in Visual Arts and Music subjects.
          </p>

          <h2>Event Details</h2>
          <ul>
            <li>Date: Friday, 06 March 2026</li>
            <li>Venue: GOR Masa Depan Cerah Surabaya</li>
            <li>Time: 18.00 WIB</li>
          </ul>

          <h2>Ticket Category</h2>
          <div className="ticket-category vip">VIP</div>
          <div className="ticket-category regular">Regular</div>
        </div>
      </div>
    </>
  );
}
