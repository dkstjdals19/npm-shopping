import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* About Me 섹션 */}
      <section id="about" className="p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAyMTdfOSAg%2FMDAxNzM5Nzk0NTkzNTg4.8_6mgeeGLYREecAOow7JJxuRZNYlK_7T-bd5tvzAkbUg.8kYi7-0WipnLBcmOhg95GHOpj8QQPV6sZuiezdJkYtog.PNG%2F%25C7%25C1%25BB%25E7-25021720.png&type=a340" // 본인 사진
          alt="Profile"
          className="w-48 h-48 object-cover rounded-full shadow"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">안녕하세요! 저는 안성민입니다.</h2>
          <p className="text-gray-700 mb-2">
            중학교 3학년이며 프로그래밍과 웹 개발에 관심이 많습니다.  
            React, TailwindCSS, Python 등을 공부하고 있습니다.
          </p>
          <p className="text-gray-700">
            앞으로 웹 개발과 데이터 분석을 활용해 다양한 프로젝트를 만들어보고 싶습니다.
          </p>
        </div>
      </section>

      {/* Skills 섹션 */}
      <section id="skills" className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Skills & 관심사</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>React, TailwindCSS, TypeScript</li>
          <li>Python 프로그래밍</li>
          <li>웹 프로젝트 개발</li>
          <li>데이터 분석 및 시각화</li>
          <li>복싱, K-POP</li>
        </ul>
      </section>

      

      
    </div>
  );
}
