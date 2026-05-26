import React from "react";

export const Icons = {
  MailIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        fill="#D5D7DA"
        d="M8.75 16.25a95 95 0 0 1-1.168-.022c-2.623-.066-3.935-.1-4.878-1.046-.942-.947-.97-2.225-1.024-4.78a58 58 0 0 1 0-2.462c.054-2.556.082-3.834 1.024-4.78s2.255-.98 4.878-1.046c1.618-.04 3.219-.04 4.836 0 2.624.066 3.935.099 4.878 1.045.943.947.97 2.225 1.024 4.781.008.379.013.557.013.81"></path>
      <path
        stroke="#181D27"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M8.75 16.25a95 95 0 0 1-1.168-.022c-2.623-.066-3.935-.1-4.878-1.046-.942-.947-.97-2.225-1.024-4.78a58 58 0 0 1 0-2.462c.054-2.556.082-3.834 1.024-4.78s2.255-.98 4.878-1.046c1.618-.04 3.219-.04 4.836 0 2.624.066 3.935.099 4.878 1.045.943.947.97 2.225 1.024 4.781.008.379.013.557.013.81"></path>
      <path
        stroke="#181D27"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="m1.667 4.167 5.76 3.27c2.105 1.195 3.04 1.195 5.146 0l5.76-3.27"></path>
      <path
        stroke="#181D27"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M15.833 14.167a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m0 0v.416a1.25 1.25 0 0 0 2.5 0v-.416a3.75 3.75 0 1 0-3.75 3.75"></path>
    </svg>
  ),
  MoveRightIcon: (props: React.SVGProps<SVGSVGElement>, className: string) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 24 24"
      width={24}
      height={24}
      fill={"none"}
      className={className}
      {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.333 11.667a1.667 1.667 0 1 1 0-3.334 1.667 1.667 0 0 1 0 3.334M7.5 10h10.833m0 0-2.5-2.5m2.5 2.5-2.5 2.5"></path>
    </svg>
  ),
  Accessibility: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...props}>
      <path
        stroke="#F80"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 36.667c9.205 0 16.667-7.462 16.667-16.667S29.205 3.333 20 3.333 3.333 10.795 3.333 20 10.795 36.667 20 36.667M11.667 15 20 16.667m0 0L28.333 15M20 16.667v5m0 0L16.667 30M20 21.667 23.333 30"></path>
      <path
        fill="#F80"
        stroke="#F80"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 11.667A.833.833 0 1 1 20 10a.833.833 0 0 1 0 1.667"></path>
    </svg>
  ),
  People: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...props}>
      <path
        stroke="#F80"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.667 30v-1.667a8.333 8.333 0 0 1 16.666 0V30M1.667 30v-1.667a5 5 0 0 1 5-5M38.333 30v-1.667a5 5 0 0 0-5-5"></path>
      <path
        stroke="#F80"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10M6.667 23.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666M33.333 23.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666"></path>
    </svg>
  ),
  Idea: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...props}>
      <path
        stroke="#F80"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M35 3.333 33.333 5M5 3.333 6.667 5M35 26.667 33.333 25M5 26.667 6.667 25M15 30h10M16.667 35h6.666M20 5c-6.667 0-10.08 3.25-10 8.333.039 2.479.833 4.167 2.5 5.834S15 21.667 15 25h10c0-3.333.833-4.167 2.5-5.833 1.666-1.667 2.46-3.356 2.5-5.834C30.08 8.25 26.667 5 20 5"></path>
    </svg>
  ),
  MoveLeftIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(-1 0 0 1 22 9)"
        stroke="currentColor"
        strokeWidth="1.5"></circle>
      <path
        d="M2 11.9999H12M2 11.9999C2 12.5619 2.4381 12.9891 3.3143 13.8436L4.97057 15.5M2 11.9999C2 11.4378 2.4381 11.0106 3.3143 10.1561L4.97044 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  MessageAddIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M12.5 3.00372C11.6049 2.99039 10.7047 3.01289 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0021 12.836 22.011 12.1627 21.9866 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M8.5 15H15.5M8.5 10H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M15 5.5H22M18.5 2L18.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  ForwardIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M21.8371 12.9178C21.5547 13.6884 20.7014 14.3047 18.9948 15.5372C16.6677 17.218 15.5041 18.0583 14.5312 17.9969C13.7882 17.9499 13.0976 17.6007 12.6223 17.0315C12 16.2863 12 14.8575 12 12C12 9.14246 12 7.71369 12.6223 6.96846C13.0976 6.39933 13.7882 6.0501 14.5312 6.00315C15.5041 5.94167 16.6677 6.78203 18.9948 8.46275C20.7014 9.6953 21.5547 10.3116 21.8371 11.0822C22.0543 11.675 22.0543 12.325 21.8371 12.9178Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"></path>
      <path
        d="M11.8371 12.9178C11.5547 13.6884 10.7014 14.3047 8.99482 15.5372C6.66769 17.218 5.50413 18.0583 4.5312 17.9969C3.78818 17.9499 3.09758 17.6007 2.62232 17.0315C2 16.2863 2 14.8575 2 12C2 9.14246 2 7.71369 2.62232 6.96846C3.09758 6.39933 3.78818 6.0501 4.5312 6.00315C5.50413 5.94167 6.66769 6.78203 8.99482 8.46275C10.7014 9.6953 11.5547 10.3116 11.8371 11.0822C12.0543 11.675 12.0543 12.325 11.8371 12.9178Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"></path>
    </svg>
  ),
  WorkIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M16 7C16 5.11438 16 4.17157 15.4142 3.58579C14.8284 3 13.8856 3 12 3C10.1144 3 9.17157 3 8.58579 3.58579C8 4.17157 8 5.11438 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M6 11L6.65197 11.202C10.0851 12.266 13.9149 12.266 17.348 11.202L18 11M12 12V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  SearchIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M17 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  SmartPhoneIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M14 2H10L10.5 3H13.5L14 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  UserStoryIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M12 2C17.5237 2 22 6.47778 22 12C22 17.5222 17.5237 22 12 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M9 21.5C7.81163 21.0953 6.69532 20.5107 5.72302 19.7462M5.72302 4.25385C6.69532 3.50059 7.81163 2.90473 9 2.5M2 10.2461C2.21607 9.08813 2.66019 7.96386 3.29638 6.94078M2 13.7539C2.21607 14.9119 2.66019 16.0361 3.29638 17.0592"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M17 17C17 14.2386 14.7614 12 12 12C9.23858 12 7 14.2386 7 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  TouchInteractionIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M8.53345 13.6528L10.5 15.3722V6.50065C10.5 5.67186 11.1719 5 12.0006 5C12.8289 5 13.5006 5.67107 13.5013 6.49935L13.5045 11.263L16.1409 11.6903C17.8426 11.9492 18.6935 12.0786 19.2928 12.4427C20.2828 13.0441 21 14 21 15.2657C21 16.1841 20.7762 16.8002 20.232 18.4556C19.8867 19.5059 19.7141 20.0311 19.4326 20.4469C18.9691 21.1313 18.2853 21.6311 17.4984 21.8605C17.0204 21.9999 16.4745 21.9999 15.3826 21.9999H14.4571C13.0054 21.9999 12.2796 21.9999 11.6335 21.7298C11.5176 21.6814 11.4044 21.6267 11.2942 21.566C10.68 21.2278 10.2224 20.6566 9.30698 19.5142L6.3436 15.8158C5.88822 15.2474 5.88518 14.4341 6.3363 13.8622C6.87851 13.175 7.87444 13.08 8.53345 13.6528Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M7 8H6.17647C4.67907 8 3.93037 8 3.46518 7.56066C3 7.12132 3 6.41421 3 5C3 3.58579 3 2.87868 3.46518 2.43934C3.93037 2 4.67907 2 6.17647 2H17.8235C19.3209 2 20.0696 2 20.5348 2.43934C21 2.87868 21 3.58579 21 5C21 6.41421 21 7.12132 20.5348 7.56066C20.0696 8 19.3209 8 17.8235 8H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  RacingFlagIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M5.67181 13.9095C10 15.9322 14 7.84169 21 11.8869L18 2.78502C13.4239 -0.299918 8.56286 6.85641 3 4.62523L8.00007 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M19 7.00073C13.5 3.00076 9 12.0007 4.5 9.00064"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M8 4.90476L10.8235 13M13.1765 3L16 10.619"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  ModernTvIssueIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M11.9998 14H12.0088"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M12 11L12 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  RemoveCircleHalfDotIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M12 2.00011C17.5228 2.00011 22 6.47726 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.523 2 12.0001M8.909 2.48697C7.9 2.81459 6.96135 3.29826 6.12153 3.90952M3.90943 6.1216C3.29806 6.96158 2.81432 7.90042 2.4867 8.90963"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M16 12.0001L8 12.0001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  TargetIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M12.0303 11.9625L16.5832 7.4096M19.7404 4.34462L19.1872 2.35748C19.0853 2.03011 18.6914 1.89965 18.4259 2.11662C16.9898 3.29018 15.4254 4.87091 16.703 7.36419C19.2771 8.56455 20.7466 6.94584 21.8733 5.5853C22.0975 5.3146 21.9623 4.90767 21.6247 4.81005L19.7404 4.34462Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  AnalysisTextLinkIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M7 4H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M7 7H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M5 20C6.07093 18.053 7.52279 13.0189 10.3063 13.0189C12.2301 13.0189 12.7283 15.4717 14.6136 15.4717C17.8572 15.4717 17.387 10 21 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  AlignSelectionIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M20 6V18M18 4H6M18 20H6M4 18V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
    </svg>
  ),
  WrenchIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"></path>
      <path
        d="M5.50896 18.5H5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  ThreeDMoveIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M12 14L17.5 18.5M12 14L6.5 18.5M12 14V7"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M10.3914 3.69046C11.1054 2.56349 11.4624 2 12 2C12.5376 2 12.8946 2.56349 13.6086 3.69046L14.1215 4.49995C14.8259 5.6118 15.1781 6.16772 14.9104 6.58386C14.6426 7 13.9327 7 12.5129 7H11.4871C10.0673 7 9.35739 7 9.08963 6.58386C8.82188 6.16772 9.17409 5.6118 9.87852 4.49995L10.3914 3.69046Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M21.2324 19.1408C21.8559 20.3502 22.1676 20.9548 21.9085 21.4249C21.6494 21.8949 20.9936 21.9144 19.6819 21.9536L18.7398 21.9817C17.4457 22.0203 16.7987 22.0396 16.5705 21.5895C16.3422 21.1393 16.6843 20.5186 17.3686 19.2773L17.8629 18.3805C18.5471 17.1391 18.8893 16.5184 19.3756 16.5004C19.8619 16.4824 20.1694 17.0789 20.7846 18.2721L21.2324 19.1408Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
      <path
        d="M2.76761 19.1408C2.14414 20.3502 1.8324 20.9548 2.09148 21.4249C2.35055 21.8949 3.00639 21.9144 4.31805 21.9536L5.26021 21.9817C6.55427 22.0203 7.20131 22.0396 7.42955 21.5895C7.65779 21.1393 7.31567 20.5186 6.63143 19.2773L6.13711 18.3805C5.45286 17.1391 5.11074 16.5184 4.62443 16.5004C4.13811 16.4824 3.83055 17.0789 3.21545 18.2721L2.76761 19.1408Z"
        stroke="currentColor"
        strokeWidth="1.5"></path>
    </svg>
  ),
  SearchAreaIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M10 3H14M3 10V14M6.5 21C4.567 21 3 19.433 3 17.5M17.5 3C19.433 3 21 4.567 21 6.5M3 6.5C3 4.567 4.567 3 6.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  TimeMachineIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      {...props}>
      <path
        stroke="#414651"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 13.875h4.5M4.95 1.5h8.1c.42 0 .63 0 .79.082a.75.75 0 0 1 .328.328c.082.16.082.37.082.79v1.556c0 .367 0 .55-.041.723a1.5 1.5 0 0 1-.18.433c-.093.152-.223.282-.482.541L11.349 8.15c-.297.297-.446.446-.502.617a.75.75 0 0 0 0 .464c.056.171.205.32.502.617l2.198 2.198c.26.26.39.39.482.54q.124.204.18.434c.041.173.041.356.041.723V15.3c0 .42 0 .63-.082.79a.75.75 0 0 1-.327.328c-.16.082-.37.082-.791.082h-8.1c-.42 0-.63 0-.79-.082a.75.75 0 0 1-.328-.328c-.082-.16-.082-.37-.082-.79v-1.556c0-.367 0-.55.041-.723q.056-.231.18-.434c.093-.15.223-.28.482-.54L6.65 9.849c.297-.297.446-.446.502-.617a.75.75 0 0 0 0-.464c-.056-.171-.205-.32-.502-.617L4.453 5.953c-.26-.26-.39-.39-.482-.54a1.5 1.5 0 0 1-.18-.434c-.041-.173-.041-.356-.041-.723V2.7c0-.42 0-.63.082-.79a.75.75 0 0 1 .328-.328c.16-.082.37-.082.79-.082"></path>
    </svg>
  ),
  ScreenshotIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}>
      <path
        d="M10 21.4V14.3937C10 14.0623 10.2686 13.7937 10.6 13.7937H11.7728C11.9768 13.7937 12.1667 13.6901 12.2772 13.5186L13.7228 11.275C13.8333 11.1036 14.0232 11 14.2272 11H17.7728C17.9768 11 18.1667 11.1036 18.2772 11.275L19.7228 13.5186C19.8333 13.6901 20.0232 13.7937 20.2272 13.7937H21.4C21.7314 13.7937 22 14.0623 22 14.3937V21.4C22 21.7314 21.7314 22 21.4 22H10.6C10.2686 22 10 21.7314 10 21.4ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19ZM3 18V21H5.5M3 9.5L3 14.5M3 6V3H6M9.5 3L14.5 3M18 3H21V5.5M21 10V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  // End of Icons
};
