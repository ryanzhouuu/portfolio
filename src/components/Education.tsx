import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Education: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Texas at Austin',
      location: 'Austin, TX',
      period: '2024-2028',
      gpa: '4.0/4.0',
      status: 'current',
      highlights: [
        'University Honors for 2 consecutive semesters',
      ],
      courses: [
        'Data Structures & Algorithms',
        'Computer Organization and Architecture',
        'Operating Systems'
      ]
    },
    {
      degree: 'High School Diploma',
      school: 'Cinco Ranch High School',
      location: 'Katy, TX',
      period: '2020-2024',
      gpa: 'Weighted: 4.7, Unweighted: 4.0',
      status: 'completed',
      highlights: [
        'National Honor Society',
        'National Merit Scholar',
        'AP Scholar with Distinction'
      ],
      courses: [
        'AP Computer Science A',
        'AP Calculus BC',
        'AP Physics',
        'AP Statistics'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer Associate',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'active'
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      status: 'active'
    },
    {
      name: 'Meta Frontend Developer',
      issuer: 'Meta',
      date: '2023',
      status: 'active'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Academic background and professional certifications in computer science
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className={`relative flex flex-col md:flex-row items-start md:items-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="text-blue-600" size={20} />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        edu.status === 'current' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {edu.status === 'current' ? 'In Progress' : 'Completed'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-lg font-semibold text-blue-600 mb-2">{edu.school}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm">{highlight}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Relevant Courses</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {/*
        <div className={`mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                style={{ transitionDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Award className="text-blue-600" size={24} />
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {cert.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-gray-600 text-sm mb-1">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">{cert.date}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Education;